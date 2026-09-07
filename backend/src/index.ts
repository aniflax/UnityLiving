import type { Core } from '@strapi/strapi';

const ensureProtocol = (url?: string): string | undefined => {
  if (!url) return undefined;
  if (url.startsWith('/')) return url;
  if (/^https?:\/\//i.test(url)) return url;
  return `https://${url}`;
};

const fixFile = (file: any): boolean => {
  let changed = false;
  if (file.url && file.url !== ensureProtocol(file.url)) {
    file.url = ensureProtocol(file.url);
    changed = true;
  }
  if (file.formats && typeof file.formats === 'object') {
    for (const key of Object.keys(file.formats)) {
      const format = file.formats[key];
      if (format?.url && format.url !== ensureProtocol(format.url)) {
        format.url = ensureProtocol(format.url);
        changed = true;
      }
    }
  }
  return changed;
};

/** Idempotently grants the public role read access to public collection APIs. */
async function ensurePublicBlogPermissions(strapi: Core.Strapi) {
  try {
    const publicRole = await strapi.db
      .query('plugin::users-permissions.role')
      .findOne({ where: { type: 'public' } });
    if (!publicRole) return;

    const existing = await strapi.db
      .query('plugin::users-permissions.permission')
      .findMany({ where: { role: { type: 'public' } } });
    const existingActions = new Set(existing.map((p: any) => p.action));
    const wanted = [
      'api::blog.blog.find',
      'api::blog.blog.findOne',
      'api::project.project.find',
      'api::project.project.findOne',
      'api::category.category.find',
      'api::category.category.findOne',
    ];

    for (const action of wanted) {
      if (!existingActions.has(action)) {
        await strapi.db
          .query('plugin::users-permissions.permission')
          .create({ data: { action, role: publicRole.id } });
        strapi.log.info(`[permissions] Granted public access to ${action}`);
      }
    }
  } catch (err) {
    strapi.log.warn(`[permissions] Could not grant public blog access: ${err}`);
  }
}

/**
 * Actions the admin panel needs to read and select existing media from the
 * Media Library when creating / editing content entries.
 */
const UPLOAD_ACTIONS = [
  { action: 'plugin::upload.read', subject: 'plugin::upload.file' },
  { action: 'plugin::upload.assets.create', subject: 'plugin::upload.file' },
  { action: 'plugin::upload.assets.update', subject: 'plugin::upload.file' },
  { action: 'plugin::upload.assets.download', subject: 'plugin::upload.file' },
  { action: 'plugin::upload.assets.copy-link', subject: 'plugin::upload.file' },
  { action: 'plugin::upload.configure-view', subject: 'plugin::upload.file' },
];

/** Grants every admin role upload-plugin actions so the media picker can load. */
async function ensureUploadPermissions(strapi: Core.Strapi) {
  try {
    const roles = await strapi.service('admin::role').find();
    const rolesList = Array.isArray(roles) ? roles : roles.results ?? [];
    for (const role of rolesList) {
      const existing = await strapi.service('admin::permission').findMany({
        where: {
          role: role.id,
          action: { $in: UPLOAD_ACTIONS.map((a) => a.action) },
        },
      });
      const existingActions = new Set(existing.map((p: any) => p.action));
      const missing = UPLOAD_ACTIONS.filter((a) => !existingActions.has(a.action));
      if (missing.length) {
        await strapi.service('admin::permission').createMany({
          data: missing.map((a) => ({ ...a, role: role.id })),
        });
        strapi.log.info(`[permissions] Granted upload actions to admin role "${role.name}"`);
      }
    }
  } catch (err) {
    strapi.log.warn(`[permissions] Could not grant upload permissions: ${err}`);
  }
}

export default {
  register({ strapi }: { strapi: Core.Strapi }) {
    strapi.server.routes([
      {
        method: 'GET',
        path: '/health',
        handler: (ctx: any) => {
          ctx.body = 'Ok';
        },
        config: {
          auth: false,
        },
      },
    ]);
  },

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    try {
      const uploadModel = 'plugin::upload.file';
      const files = await strapi.db.query(uploadModel).findMany();

      let updated = 0;
      for (const file of files) {
        if (fixFile(file)) {
          await strapi.db.query(uploadModel).update({ where: { id: file.id }, data: file });
          updated++;
        }
      }

      if (updated > 0) {
        strapi.log.info(`[r2-url-fix] Fixed ${updated} upload record(s) with missing protocol`);
      }
    } catch (err) {
      strapi.log.warn(`[r2-url-fix] Could not fix upload URLs: ${err}`);
    }

    await ensurePublicBlogPermissions(strapi);
    await ensureUploadPermissions(strapi);
  },
};

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

/** Idempotently grants the public role read access to the blog collection API. */
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
    const wanted = ['api::blog.blog.find', 'api::blog.blog.findOne'];

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
  },
};

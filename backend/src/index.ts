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
  },
};

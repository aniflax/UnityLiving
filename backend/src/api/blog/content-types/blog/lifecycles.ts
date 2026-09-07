/**
 * Blog lifecycles — enforce that only one blog can be marked "important" (imp=true).
 * Whenever an entry becomes imp:true (create or update), all other blogs are set to imp:false.
 */
import type { Core } from '@strapi/strapi';

const clearOtherImps = async (strapi: Core.Strapi, documentId: string) => {
  await strapi.db.query('api::blog.blog').updateMany({
    where: { documentId: { $ne: documentId } },
    data: { imp: false },
  });
};

export default {
  async afterCreate(event: any) {
    const { result } = event;
    if (result && result.imp === true && result.documentId) {
      await clearOtherImps(strapi, result.documentId);
    }
  },
  async afterUpdate(event: any) {
    const { result } = event;
    if (result && result.imp === true && result.documentId) {
      await clearOtherImps(strapi, result.documentId);
    }
  },
};

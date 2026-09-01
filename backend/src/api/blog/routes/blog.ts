/**
 * blog router.
 */

import { factories } from '@strapi/strapi';

// The marketing site reads blog posts without an authenticated Strapi session.
export default factories.createCoreRouter('api::blog.blog', {
  config: {
    find: {
      auth: false,
    },
    findOne: {
      auth: false,
    },
  },
});

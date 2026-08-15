/**
 * personal-information router
 */

import { factories } from '@strapi/strapi';

// This single type contains only site-wide public contact details and social
// links. The marketing site reads it without an authenticated Strapi session.
export default factories.createCoreRouter('api::personal-information.personal-information', {
  config: {
    find: {
      auth: false,
    },
  },
});

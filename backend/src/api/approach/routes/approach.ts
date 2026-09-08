/**
 * approach router
 */

import { factories } from '@strapi/strapi';

// Public read for the marketing site
export default factories.createCoreRouter('api::approach.approach', {
  config: {
    find: {
      auth: false,
    },
  },
});
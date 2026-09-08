/**
 * fact router
 */

import { factories } from '@strapi/strapi';

// Public read for the marketing site
export default factories.createCoreRouter('api::fact.fact', {
  config: {
    find: {
      auth: false,
    },
  },
});
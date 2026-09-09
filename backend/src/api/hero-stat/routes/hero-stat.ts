/**
 * hero-stat router
 */

import { factories } from '@strapi/strapi';

// Public read for the marketing site — no frontend fallback
export default factories.createCoreRouter('api::hero-stat.hero-stat', {
  config: {
    find: {
      auth: false,
    },
  },
});

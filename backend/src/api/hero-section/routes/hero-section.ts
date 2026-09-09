/**
 * hero-section router
 */

import { factories } from '@strapi/strapi';

// Public read for the marketing site — no frontend fallback
export default factories.createCoreRouter('api::hero-section.hero-section', {
  config: {
    find: {
      auth: false,
    },
  },
});

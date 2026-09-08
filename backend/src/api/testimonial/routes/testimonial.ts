/**
 * testimonial router
 */

import { factories } from '@strapi/strapi';

// Public read for the marketing site
export default factories.createCoreRouter('api::testimonial.testimonial', {
  config: {
    find: {
      auth: false,
    },
    findOne: {
      auth: false,
    },
  },
});
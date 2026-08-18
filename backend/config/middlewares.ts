import type { Core } from '@strapi/strapi';

const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Middlewares => {
  // Origins allowed to call the Strapi REST API from the browser.
  // Defaults to a permissive list for the public frontend; tighten via CORS_ORIGINS
  // (comma-separated) in the production env if desired.
  const origins = (env('CORS_ORIGINS') ?? '*')
    .split(',')
    .map((o: string) => o.trim())
    .filter(Boolean);

  // CDN origin used for uploaded media (Cloudflare R2 via CDN_URL). Allowed in
  // the admin panel's Content-Security-Policy so media previews aren't blocked.
  const cdn = env('CDN_URL')?.trim().replace(/\/+$/, '');

  return [
    'strapi::logger',
    'strapi::errors',
    {
      name: 'strapi::security',
      config: {
        contentSecurityPolicy: {
          useDefaults: true,
          directives: {
            'img-src': ["'self'", 'data:', 'blob:', 'https://market-assets.strapi.io', ...(cdn ? [cdn] : [])],
            'media-src': ["'self'", 'data:', 'blob:', ...(cdn ? [cdn] : [])],
          },
        },
      },
    },
    {
      name: 'strapi::cors',
      config: {
        enabled: true,
        origin: origins,
      },
    },
    'strapi::poweredBy',
    'strapi::query',
    'strapi::body',
    'strapi::session',
    'strapi::favicon',
    'strapi::public',
    'global::admin-head-tags',
  ];
};

export default config;

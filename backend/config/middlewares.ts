import type { Core } from '@strapi/strapi';

const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Middlewares => {
  // Origins allowed to call the Strapi REST API from the browser.
  // Defaults to a permissive list for the public frontend; tighten via CORS_ORIGINS
  // (comma-separated) in the production env if desired.
  const origins = (env('CORS_ORIGINS') ?? '*')
    .split(',')
    .map((o: string) => o.trim())
    .filter(Boolean);

  return [
    'strapi::logger',
    'strapi::errors',
    'strapi::security',
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

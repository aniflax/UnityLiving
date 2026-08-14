import type { StrapiApp } from '@strapi/strapi/admin';

export default {
  config: {
    locales: [],
    auth: {
      logo: '/favicon.png',
    },
    menu: {
      logo: '/favicon.png',
    },
    translations: {
      en: {
        'Auth.form.welcome.title': 'Welcome to Unityaliving!',
        'Auth.form.welcome.subtitle': 'Log in to your Administrative Panel',
      },
    },
  },
  bootstrap(app: StrapiApp) {},
};

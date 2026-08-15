'use strict';

// Migrates the site-wide personal information (contact details + social links)
// into the connected Strapi database (e.g. Neon PostgreSQL in production).
// Run with: npm run migrate:personal-information
//
// This mirrors the values previously hardcoded in the frontend
// (Frontend/src/lib/site.ts) so the frontend can fetch them from Strapi only.
// name, tagline, mission and address stay hardcoded in the frontend.

const CURRENT_PERSONAL_INFORMATION = {
  email: 'unityaliving@gmail.com',
  phone: '+91 6232 691 255',
  whatsapp:
    'https://wa.me/916232691255?text=Hi%20Unityaliving%2C%20I%27d%20like%20to%20know%20more',
  hours: 'Mon–Sat · 10am–7pm',
  rera: 'RERA registered · Indore, Madhya Pradesh',
  instagram: 'https://instagram.com',
  facebook: 'https://facebook.com',
  youtube: 'https://youtube.com',
  linkedin: 'https://linkedin.com',
};

async function setPublicPermissions() {
  // Find the ID of the public role
  const publicRole = await strapi.query('plugin::users-permissions.role').findOne({
    where: {
      type: 'public',
    },
  });

  if (!publicRole) {
    console.log('Public role not found — skipping public permission setup.');
    return;
  }

  const action = 'api::personal-information.personal-information.find';
  const existing = await strapi.query('plugin::users-permissions.permission').findOne({
    where: {
      action,
      role: publicRole.id,
    },
  });

  if (!existing) {
    await strapi.query('plugin::users-permissions.permission').create({
      data: {
        action,
        role: publicRole.id,
      },
    });
    console.log(`Granted public "find" on ${action}`);
  } else {
    console.log(`Public "find" on ${action} already granted`);
  }
}

async function upsertPersonalInformation() {
  const uid = 'api::personal-information.personal-information';

  const existing = await strapi.documents(uid).findFirst({});

  if (existing) {
    await strapi.documents(uid).update({
      documentId: existing.documentId,
      data: CURRENT_PERSONAL_INFORMATION,
    });
    console.log(`Updated existing "Personal Informations" entry (${existing.documentId})`);
  } else {
    await strapi.documents(uid).create({
      data: CURRENT_PERSONAL_INFORMATION,
    });
    console.log('Created "Personal Informations" entry');
  }
}

async function main() {
  const { createStrapi, compileStrapi } = require('@strapi/strapi');

  const appContext = await compileStrapi();
  const app = await createStrapi(appContext).load();

  app.log.level = 'error';

  await setPublicPermissions();
  await upsertPersonalInformation();

  await app.destroy();
  process.exit(0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

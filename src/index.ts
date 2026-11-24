import type { Core } from '@strapi/strapi';

export default {
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  /**
   * Creates the first admin from ADMIN_EMAIL and ADMIN_PASSWORD when there is
   * none yet, so a fresh deploy doesn't show a public "create the first admin"
   * page. Nothing happens once an admin exists, or when they aren't set.
   */
  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    const email = process.env.ADMIN_EMAIL?.trim();
    const password = process.env.ADMIN_PASSWORD;
    if (!email || !password) return;

    const users = strapi.service('admin::user');
    if (await users.exists()) return;

    const superAdmin = await strapi.service('admin::role').getSuperAdmin();
    await users.create({
      email: email.toLowerCase(),
      firstname: 'Admin',
      password,
      isActive: true,
      registrationToken: null,
      roles: superAdmin ? [superAdmin.id] : [],
    });
    strapi.log.info(`Created the first admin user, ${email}`);
  },
};

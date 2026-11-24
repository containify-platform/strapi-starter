import type { Core } from '@strapi/strapi';

export default ({ strapi }: { strapi: Core.Strapi }) => ({
  async check(ctx: { status: number; body: unknown }) {
    try {
      await strapi.db.connection.raw('select 1');
      ctx.body = { status: 'ok' };
    } catch (err) {
      strapi.log.error('health check failed', err);
      ctx.status = 503;
      ctx.body = { status: 'error' };
    }
  },
});

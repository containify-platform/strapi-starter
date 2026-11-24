// GET /api/health: Strapi is up and Postgres answers. Public (no auth).
export default {
  routes: [
    {
      method: 'GET',
      path: '/health',
      handler: 'health.check',
      config: { auth: false },
    },
  ],
};

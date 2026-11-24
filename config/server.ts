import type { Core } from '@strapi/strapi';

const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Server => ({
  // Containify sets HOST=:: (every IPv4 and IPv6 address).
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  // The public URL, e.g. https://cms.example.com. Behind an HTTPS proxy, Strapi
  // needs it (and proxy) to build links and set secure admin cookies.
  url: env('PUBLIC_URL', ''),
  proxy: env.bool('IS_PROXIED', true),
  app: {
    keys: env.array('APP_KEYS')!,
  },
  webhooks: {
    populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', false),
  },
});

export default config;

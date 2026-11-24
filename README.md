# Strapi starter

[![Deploy on Containify](https://containify.cloud/deploy-button.svg)](https://containify.cloud/templates/strapi)

A [Strapi 5](https://strapi.io) project with Postgres, ready to deploy on
[Containify](https://containify.cloud). It is the source of the
[Strapi template](https://containify.cloud/templates/strapi).

What's in it:

- Postgres from `DATABASE_URL` (or the separate `DATABASE_*` variables)
- An example **Article** collection type in `src/api/article`: edit or delete it
- `GET /api/health`: 200 when Strapi is up and Postgres answers
- The first admin created from `ADMIN_EMAIL` and `ADMIN_PASSWORD` on start (see `src/index.ts`),
  so a fresh deploy has no public "create the first admin" page
- A production Dockerfile: the admin panel is built into the image, and it runs as the
  non-root `node` user

## Run locally

```bash
docker run -d --name strapi-db -e POSTGRES_USER=strapi -e POSTGRES_PASSWORD=strapi -p 5432:5432 postgres:17
cp .env.example .env   # then fill in the secrets: openssl rand -base64 32
npm install
npm run develop
```

Open http://localhost:1337/admin. In development you can change content types in the
Content-Type Builder; Strapi writes them to `src/api`. Commit them: in production the
schema comes from the code and can't be edited in the admin panel.

## Deploy on Containify

[![Deploy on Containify](https://containify.cloud/deploy-button.svg)](https://containify.cloud/templates/strapi)

One click deploys it on [Containify](https://containify.cloud). The [template page](https://containify.cloud/templates/strapi) shows what it creates, and passwords, connection strings and the HTTPS address are filled in for you.

Deploy the Strapi template from the Containify catalogue. It builds this repo, adds a
Postgres database, generates every secret and mounts a volume on `public/uploads` for
media. To ship your own content types, fork this repo, change it locally, push, and point
the Strapi app at your fork.

## Environment

| Variable                 | What it is                                                     |
| ------------------------ | -------------------------------------------------------------- |
| `DATABASE_URL`           | Postgres connection string                                     |
| `APP_KEYS`               | Comma-separated session keys                                   |
| `API_TOKEN_SALT`, `ADMIN_JWT_SECRET`, `TRANSFER_TOKEN_SALT`, `JWT_SECRET`, `ENCRYPTION_KEY` | Secrets; generate each one |
| `PUBLIC_URL`             | The public URL, e.g. `https://cms.example.com`                 |
| `ADMIN_EMAIL`, `ADMIN_PASSWORD` | Optional: the first admin, created when there is none   |
| `HOST`, `PORT`           | Where it listens; `0.0.0.0` and `1337` by default              |

## License

MIT

---

Made by [Containify](https://containify.cloud): deploy apps, databases and workers from a Git repo or an image, with per-second billing. [Docs](https://containify.cloud/docs) · [Templates](https://containify.cloud/templates)

# Minesweeper (Vite Client + Vite Server)

This repository contains a React client and an Express API, both migrated to Vite tooling.

## Project layout

- `client`: React UI powered by Vite.
- `server`: Express API using `vite-node` in development and `vite build` for production output.

## Quick start

Install dependencies (root + each package):

```bash
npm install
npm --prefix client install
npm --prefix server install
```

Run both apps in development:

```bash
npm run dev
```

Build both apps:

```bash
npm run build
```

Start production mode (server serves built client files):

```bash
npm run start
```

## Environment

- Server env values are loaded from `server/.env`.
- Client can optionally use `VITE_API_BASE_URL` (for example in `client/.env`) to point to a custom API URL.
- If `VITE_API_BASE_URL` is not set, the client uses relative API paths and Vite proxy in development.

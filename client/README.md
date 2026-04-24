# Client (Vite)

## Scripts

```bash
npm run dev
npm run build
npm run preview
```

## API base URL

Set `VITE_API_BASE_URL` in `client/.env` when you need to call an API host directly.

Example:

```bash
VITE_API_BASE_URL=http://localhost:3000
```

If not set, the app uses relative paths and the Vite dev proxy configured in `client/vite.config.mjs`.

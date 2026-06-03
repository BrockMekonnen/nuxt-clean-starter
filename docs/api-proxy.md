# API proxy (BFF)

The starter can route API traffic through the Nuxt server so the browser only talks to **same-origin** `/api`, while Nitro forwards to your real backend.

## Defaults

| Variable               | Scope                    | Default                     | Purpose                                 |
| ---------------------- | ------------------------ | --------------------------- | --------------------------------------- |
| `NUXT_PUBLIC_API_BASE` | Public (client + server) | `/api`                      | Base URL used by `$http` / `HttpClient` |
| `NUXT_API_UPSTREAM`    | Server only              | `http://127.0.0.1:9090/api` | Upstream API for the proxy              |

Non-auth client requests go to `/api/*` → Nitro handler
`src/server/api/[...].ts` → `NUXT_API_UPSTREAM/*`.

The catch-all file must be named `[...].ts` (not `[...path].ts`) so paths with multiple segments match.

Auth routes are handled before the catch-all proxy:

- `src/server/api/users/login.post.ts` forwards login upstream, stores the token
  in an httpOnly cookie, and returns the current user.
- `src/server/api/users/me.get.ts` reads the auth cookie and forwards it as a
  bearer token.
- `src/server/api/auth/logout.post.ts` clears the auth cookie.

## Bypass the proxy (direct API)

For local debugging against a remote or different host, point the client straight at the API:

```env
NUXT_PUBLIC_API_BASE=http://127.0.0.1:9090/api
```

`NUXT_API_UPSTREAM` is unused when the public base is already an absolute URL.

## Validation

`src/_core/config/validate_runtime_env.ts` (Zod) runs when `nuxt.config.ts` loads. Invalid URLs fail at `nuxt dev`, `nuxt build`, and in CI.

## Local `.env`

Copy `.env.example`. Defaults use the BFF (`NUXT_PUBLIC_API_BASE=/api`) and `NUXT_API_UPSTREAM` pointing at your Go API.

## Production notes

- Set `NUXT_API_UPSTREAM` to your internal API URL (not exposed to the browser).
- Keep `NUXT_PUBLIC_API_BASE=/api` so cookies and CORS stay on the app origin.
- Add route allowlists, rate limits, request logging, or stricter auth checks in
  the proxy handler as needed.

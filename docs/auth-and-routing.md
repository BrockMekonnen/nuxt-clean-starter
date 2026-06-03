# Auth and routing conventions

How authentication, guards, and redirects work in this starter.

---

## Protected routes

Pages that require a session set:

```ts
definePageMeta({
  middleware: 'auth',
  requiresAuth: true
})
```

**`middleware/auth.ts`** redirects unauthenticated users to **`/login`**, with a `redirect` query param so they return after sign-in:

```
/login?redirect=/settings
```

`/errors/401` remains available as a standalone page (bookmarks, explicit links) but is not used by the auth middleware.

---

## Guest-only routes

Login and register use `middleware: 'guest'` and `guestOnly: true`. Signed-in users are sent to the first nav route (usually `/home`).

---

## After login

`login_form.vue` navigates to `safeRedirectPath(route.query.redirect, firstNavRoute())` so deep links to protected pages work after authentication.

---

## After register

Registration does **not** auto-login (API returns no session). On success the app navigates to:

```
/login?registered=1
```

The login form shows a short success banner. Sign in with the new account to continue.

To auto-login after register later: call `login()` in the store after `register()` succeeds, or extend the API to return a token from register.

---

## Demo form values (development only)

In `import.meta.dev`, login and register forms pre-fill sample values for local testing against the Go API. Production builds start with empty fields.

---

## Offline requests

- `useNetworkStore().isOnline` tracks browser connectivity.
- `plugins/http.ts` calls `ensureConnected()` before `$fetch` on the client and throws `ConnectionFailure`.
- A banner in `app.vue` warns when offline.

Repositories do not check the network directly; all HTTP goes through `$http`.

## Authorization header

`plugins/http.ts` attaches `Authorization: Bearer <token>` on every request (reads the auth cookie, or `options.authToken` for a one-off override after login). Repositories should not build Bearer headers manually — same role as Flutter's Dio `onRequest` interceptor in `lib/_core/http_client.dart`.

# Security Policy

## Supported Versions

This repository is a starter template. Security fixes are expected to land on
the default branch, and users should regularly pull template updates or port the
relevant changes into their generated applications.

## Reporting a Vulnerability

Please do not open public issues for suspected vulnerabilities. Instead, report
the issue privately through GitHub Security Advisories if this repository is
hosted on GitHub, or contact the maintainer directly.

Include:

- Affected files or routes
- Steps to reproduce
- Expected impact
- Suggested fix, if known

## Production Notes

- The default API path uses a same-origin Nitro BFF so auth tokens can be stored
  in httpOnly cookies.
- Keep `NUXT_PUBLIC_API_BASE=/api` in production unless you intentionally want
  direct browser-to-API requests.
- If you bypass the BFF with an absolute `NUXT_PUBLIC_API_BASE`, the client must
  handle the API's auth model directly.
- Review `docs/large-apps.md` before shipping public production apps,
  especially the sections on `nuxt-security`, SEO, observability, and auth.

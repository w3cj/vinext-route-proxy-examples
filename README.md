# vinext Route Level Proxy Demo

> [!IMPORTANT]
> This is a demo of a proof of concept published [here](https://github.com/w3cj/vinext/pull/1) and unlikely to get merged without major discussion. It was coded fully with Claude Opus 4.6

This app demonstrates vinext route proxies — `proxy.ts` files that intercept requests at each directory level, cascading from root to leaf.

View a live demo here: https://vinext-route-proxy-examples.cj-syntax.workers.dev/

## Route-Level Proxies

| Route | Description | Code |
|-------|-------------|------|
| `/about` | Route proxy sets `x-about-route-proxy` header. Global middleware also runs, demonstrating coexistence. | [proxy](app/about/proxy.ts), [page](app/about/page.tsx) |
| `/proxy-test` | Root proxy test (sets `x-route-proxy-root` header) | [proxy](app/proxy-test/proxy.ts), [page](app/proxy-test/page.tsx) |
| `/proxy-test/nested` | Both root and nested proxies run, proving root-to-leaf cascade | [proxy](app/proxy-test/nested/proxy.ts), [page](app/proxy-test/nested/page.tsx) |
| `/proxy-test/blocked` | Proxy blocks the request, returning 403 before page renders | [proxy](app/proxy-test/blocked/proxy.ts), [page](app/proxy-test/blocked/page.tsx) |
| `/proxy-test/rewrite-test` | Proxy rewrites to /about (URL stays, content changes) | [proxy](app/proxy-test/rewrite-test/proxy.ts), [page](app/proxy-test/rewrite-test/page.tsx) |
| `/proxy-test/redirect-test` | Proxy redirects to /about (302) | [proxy](app/proxy-test/redirect-test/proxy.ts), [page](app/proxy-test/redirect-test/page.tsx) |
| `/proxy-test/matcher-test` | Proxy with `config.matcher` (only runs on this exact path) | [proxy](app/proxy-test/matcher-test/proxy.ts), [page](app/proxy-test/matcher-test/page.tsx) |
| `/proxy-test/matcher-test/excluded` | Excluded from matcher — proxy does NOT run on this sub-path | [page](app/proxy-test/matcher-test/excluded/page.tsx) |

## Deep Nesting (8-Level Proxy Chain)

| Route | Description | Code |
|-------|-------------|------|
| `/deeply/nested/route/with/proxy/at/each/level` | 8 proxies cascade root-to-leaf, each setting a response header (`x-proxy-deeply` through `x-proxy-level`) | [deeply](app/deeply/proxy.ts), [nested](app/deeply/nested/proxy.ts), [route](app/deeply/nested/route/proxy.ts), [with](app/deeply/nested/route/with/proxy.ts), [proxy](app/deeply/nested/route/with/proxy/proxy.ts), [at](app/deeply/nested/route/with/proxy/at/proxy.ts), [each](app/deeply/nested/route/with/proxy/at/each/proxy.ts), [level](app/deeply/nested/route/with/proxy/at/each/level/proxy.ts), [page](app/deeply/nested/route/with/proxy/at/each/level/page.tsx) |

## API Route Proxy

| Route | Description | Code |
|-------|-------------|------|
| `/api/proxy-api-test` | API route blocked by proxy before route handler executes (returns 403) | [proxy](app/api/proxy-api-test/proxy.ts), [route](app/api/proxy-api-test/route.ts) |

## Global Middleware (Root proxy.ts)

The root [`proxy.ts`](proxy.ts) runs before route-level proxies on matched paths.

| Route | Description |
|-------|-------------|
| `/middleware-redirect` | Redirects to /about with a cookie |
| `/middleware-blocked` | Returns 403 "Blocked by middleware" |

import Link from "next/link";

export default function HomePage() {
  return (
    <main>
      <h1>Route Proxy Demo</h1>
      <p>
        This app demonstrates vinext route proxies — <code>proxy.ts</code> files
        that intercept requests at each directory level, cascading from root to
        leaf.
      </p>

      <h2>Route-Level Proxies</h2>
      <ul>
        <li>
          <Link href="/about">/about</Link> — Route proxy sets{" "}
          <code>x-about-route-proxy</code> header. Global middleware also runs,
          demonstrating coexistence.
        </li>
        <li>
          <Link href="/proxy-test">/proxy-test</Link> — Root proxy test (sets{" "}
          <code>x-route-proxy-root</code> header)
        </li>
        <li>
          <Link href="/proxy-test/nested">/proxy-test/nested</Link> — Both root
          and nested proxies run, proving root-to-leaf cascade
        </li>
        <li>
          <Link href="/proxy-test/blocked">/proxy-test/blocked</Link> — Proxy
          blocks the request, returning 403 before page renders
        </li>
        <li>
          <Link href="/proxy-test/rewrite-test">/proxy-test/rewrite-test</Link>{" "}
          — Proxy rewrites to /about (URL stays, content changes)
        </li>
        <li>
          <Link href="/proxy-test/redirect-test">
            /proxy-test/redirect-test
          </Link>{" "}
          — Proxy redirects to /about (302)
        </li>
        <li>
          <Link href="/proxy-test/matcher-test">/proxy-test/matcher-test</Link>{" "}
          — Proxy with <code>config.matcher</code> (only runs on this exact
          path)
        </li>
        <li>
          <Link href="/proxy-test/matcher-test/excluded">
            /proxy-test/matcher-test/excluded
          </Link>{" "}
          — Excluded from matcher: proxy does NOT run on this sub-path
        </li>
      </ul>

      <h2>Deep Nesting (8-Level Proxy Chain)</h2>
      <ul>
        <li>
          <Link href="/deeply/nested/route/with/proxy/at/each/level">
            /deeply/nested/route/with/proxy/at/each/level
          </Link>{" "}
          — 8 proxies cascade root-to-leaf, each setting a response header
          (<code>x-proxy-deeply</code> through <code>x-proxy-level</code>)
        </li>
      </ul>

      <h2>API Route Proxy</h2>
      <ul>
        <li>
          <Link href="/api/proxy-api-test">/api/proxy-api-test</Link> — API
          route blocked by proxy before route handler executes (returns 403)
        </li>
      </ul>

      <h2>Global Middleware (Root proxy.ts)</h2>
      <ul>
        <li>
          <code>/middleware-redirect</code> — Redirects to /about with a cookie
        </li>
        <li>
          <code>/middleware-blocked</code> — Returns 403 "Blocked by middleware"
        </li>
      </ul>
    </main>
  );
}

export default function DeeplyNestedPage() {
  const levels = [
    { header: "x-proxy-deeply", value: "1-deeply", segment: "deeply" },
    { header: "x-proxy-nested", value: "2-nested", segment: "nested" },
    { header: "x-proxy-route", value: "3-route", segment: "route" },
    { header: "x-proxy-with", value: "4-with", segment: "with" },
    { header: "x-proxy-proxy", value: "5-proxy", segment: "proxy" },
    { header: "x-proxy-at", value: "6-at", segment: "at" },
    { header: "x-proxy-each", value: "7-each", segment: "each" },
    { header: "x-proxy-level", value: "8-level", segment: "level" },
  ];

  return (
    <main>
      <h1>Deeply Nested Proxy Chain</h1>
      <p>
        This page lives at <code>/deeply/nested/route/with/proxy/at/each/level</code>.
        Every segment has a <code>proxy.ts</code> that sets a response header.
        All 8 proxies run in root-to-leaf order.
      </p>
      <h2>Expected Response Headers</h2>
      <ol>
        {levels.map(({ header, value, segment }) => (
          <li key={header}>
            <code>{header}: {value}</code> — set by <code>app/{segment}/proxy.ts</code>
          </li>
        ))}
      </ol>
    </main>
  );
}

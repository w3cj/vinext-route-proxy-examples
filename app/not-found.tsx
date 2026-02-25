"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NotFound() {
  const pathname = usePathname();

  return (
    <main>
      <h1>404 — Not Found</h1>
      <p>
        No route matches <code>{pathname}</code>
      </p>
      <p>
        <Link href="/">Back to home</Link>
      </p>
    </main>
  );
}

function normalizeBasePath(raw: string | undefined): string {
  if (!raw) return "";
  const trimmed = raw.trim();
  if (!trimmed || trimmed === "/") return "";
  return trimmed.endsWith("/") ? trimmed.slice(0, -1) : trimmed;
}

/**
 * Base path used when deploying under a sub-path (e.g. GitHub Pages project sites).
 *
 * Prefer `NEXT_PUBLIC_BASE_PATH` so it is available in client bundles too.
 * Fallback to `PAGES_BASE_PATH` for local builds/tests.
 */
export const BASE_PATH = normalizeBasePath(
  process.env.NEXT_PUBLIC_BASE_PATH ?? process.env.PAGES_BASE_PATH
);

function isExternalHref(href: string): boolean {
  return (
    href.startsWith("http://") ||
    href.startsWith("https://") ||
    href.startsWith("//") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:")
  );
}

/**
 * Prefixes an href/src with `BASE_PATH` when needed.
 *
 * - Leaves external/protocol links intact
 * - Leaves hash links intact
 * - Avoids double-prefixing
 */
export function withBasePath(href: string): string {
  if (!href) return href;
  if (!BASE_PATH) return href;
  if (href.startsWith("#")) return href;
  if (isExternalHref(href)) return href;

  // Relative URLs already work under a sub-path.
  if (!href.startsWith("/")) return href;

  if (href === "/") return `${BASE_PATH}/`;
  if (href === BASE_PATH || href.startsWith(`${BASE_PATH}/`)) return href;

  return `${BASE_PATH}${href}`;
}

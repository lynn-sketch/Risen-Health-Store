/** Prefix public asset paths for Vite / GitHub Pages base URL. */
export function asset(path: string): string {
  const base = import.meta.env.BASE_URL
  return `${base}${path.replace(/^\//, '')}`
}

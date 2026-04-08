/**
 * Returns the public asset path with the configured basePath prefixed.
 *
 * Next.js is supposed to prepend basePath automatically for <Image> and <Link>,
 * but in static exports (output: "export") with `images.unoptimized: true` it
 * does NOT rewrite next/image src values. This helper provides a reliable
 * client- and server-safe prefix.
 *
 * Set NEXT_PUBLIC_BASE_PATH in next.config when basePath is in effect.
 */
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function withBasePath(src: string): string {
  if (!BASE_PATH) return src;
  if (!src.startsWith("/")) return src;
  if (src.startsWith(BASE_PATH + "/") || src === BASE_PATH) return src;
  return `${BASE_PATH}${src}`;
}

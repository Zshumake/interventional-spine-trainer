import type { NextConfig } from "next";

const isGithubPages = process.env.GITHUB_PAGES === "true";
const GH_BASE_PATH = "/interventional-spine-trainer";

const nextConfig: NextConfig = {
  // Static export only for GitHub Pages fallback
  ...(isGithubPages
    ? {
        output: "export",
        basePath: GH_BASE_PATH,
        images: { unoptimized: true },
        // Expose basePath to the client bundle so withBasePath() works for
        // public/ assets. Next 16 + unoptimized images does NOT auto-prepend
        // basePath onto next/image src values, so we prefix manually.
        env: { NEXT_PUBLIC_BASE_PATH: GH_BASE_PATH },
      }
    : {}),
};

export default nextConfig;

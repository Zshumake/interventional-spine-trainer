import type { NextConfig } from "next";

const isGithubPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  // Static export only for GitHub Pages fallback
  ...(isGithubPages
    ? {
        output: "export",
        basePath: "/interventional-spine-trainer",
        images: { unoptimized: true },
      }
    : {}),
};

export default nextConfig;

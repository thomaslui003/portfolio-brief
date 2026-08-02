import type { NextConfig } from "next";

const repo = "portfolio-brief";
const isCi = process.env.GITHUB_ACTIONS === "true";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  // Project Pages: https://<user>.github.io/portfolio-brief/
  basePath: isCi ? `/${repo}` : "",
  assetPrefix: isCi ? `/${repo}/` : undefined,
};

export default nextConfig;

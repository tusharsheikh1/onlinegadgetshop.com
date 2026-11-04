/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { unoptimized: true },
  // `npm run export` builds a static copy (out/) for hosting without a Node server.
  ...(process.env.STATIC_EXPORT ? { output: "export", trailingSlash: true } : {}),
};
export default nextConfig;

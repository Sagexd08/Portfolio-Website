/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");
import WithPWA from "next-pwa";

const withPWA = WithPWA({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  scope: "/",
  sw: "service-worker.js",
});

/**
 * @type {import('next').NextConfig}
 */
// @ts-ignore
const config = withPWA({
  reactStrictMode: true,

  /**
   * If you are using `appDir` then you must comment the below `i18n` config out.
   *
   * @see https://github.com/vercel/next.js/issues/41980
   */
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },

  // Enable static exports for Firebase hosting
  output: 'export',

  // Configure allowed image domains and disable optimization for static export
  images: {
    domains: ['res.cloudinary.com'],
    unoptimized: true,
  },
});

export default config;
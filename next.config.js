/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Barrel-file imports (lucide-react, motion) get rewritten to deep
  // imports at build time so unused icons/exports never reach the bundle.
  experimental: {
    optimizePackageImports: ['lucide-react', 'motion'],
  },
}

module.exports = nextConfig

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Barrel-file imports (lucide-react, motion) get rewritten to deep
  // imports at build time so unused icons/exports never reach the bundle.
  experimental: {
    optimizePackageImports: ['lucide-react', 'motion'],
  },

  // Applied to every route. No CSP here: the theme bootstrap and JSON-LD in
  // layout.tsx are inline scripts, so a meaningful policy needs a nonce and
  // that needs middleware — worth doing, but as its own change.
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
        ],
      },
    ]
  },
}

module.exports = nextConfig

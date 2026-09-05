/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Barrel-file imports (lucide-react, motion) get rewritten to deep
  // imports at build time so unused icons/exports never reach the bundle.
  experimental: {
    optimizePackageImports: ['lucide-react', 'motion'],
  },

  // Applied to every route.
  //
  // The CSP deliberately omits script-src. Next inlines its own hydration
  // payload as ~9 <script> blocks per page, so locking scripts down means a
  // per-request nonce, which means reading headers() in the layout, which
  // opts every page out of static rendering. Not worth it for a static site;
  // the directives below need no nonce and cost nothing.
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
          {
            key: 'Content-Security-Policy',
            value: [
              "base-uri 'self'",
              "form-action 'self'",
              "frame-ancestors 'none'",
              "object-src 'none'",
              'upgrade-insecure-requests',
            ].join('; '),
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig

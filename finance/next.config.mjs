/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      serverActions: {
        allowedOrigins: [
          "https://turbo-space-lamp-9vqr4qw7x57hp4q-3000.app.github.dev/",
          "localhost:3000",
        ],
      },
      mdxRs: true,
    },
    webpack(config, { isServer }) {
      // Only modify the Webpack config for the client-side bundle
      if (!isServer) {
        config.resolve.fallback = {
          ...config.resolve.fallback,
          fs: false, // Ignore `fs` for client-side
          path: false, // Ignore `path` for client-side
        };
      }
      
      return config;
    },
  };
  
  export default nextConfig;
  
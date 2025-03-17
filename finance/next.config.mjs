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
    };
export default nextConfig;
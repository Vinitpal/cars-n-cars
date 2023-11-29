/** @type {import('next').NextConfig} */

const path = require("path");

const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  images: {
    domains: ["admin.carsNcars.in", "res.cloudinary.com", "cdn.discordapp.com"],
  },
};

module.exports = nextConfig;

// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//   enabled: process.env.ANALYZE === 'true',
// })

// module.exports = withBundleAnalyzer({ })

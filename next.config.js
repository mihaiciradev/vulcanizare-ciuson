/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
  },
  async redirects() {
    return [
      {
        source: "/",
        has: [{ type: "host", value: "www.ciuson.ro" }],
        destination: "https://ciuson.ro/",
        permanent: true,
      },
      {
        source: "/:path+",
        has: [{ type: "host", value: "www.ciuson.ro" }],
        destination: "https://ciuson.ro/:path+",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;

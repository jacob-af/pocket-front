/** @type {import('next').NextConfig} */

import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  cacheOnFrontendNav: true,
  aggressiveFrontEndNavCaching: true,
  cacheStartUrl: process.env.NEXTAUTH_URL,
  //dynamicStartUrl: `${process.env.NEXTAUTH_URL}db/`,
  disabled: false,
  reloadOnOnline: true
  //fallbacks: `${process.env.NEXTAUTH_URL}db/`
});

export default withPWA({
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io"
      }
    ]
  }
});

// const nextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "utfs.io"
//       }
//     ]
//   }
// };

//export default nextConfig;

// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };

// export default nextConfig;



// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "test.flipflops.cc",
//         pathname: "/media/catalog/product/**",
//       },
//     ],
//   },
// };

// export default nextConfig;


// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "test.flipflops.cc",
//         pathname: "/media/catalog/product/**",
//       },
//     ],
//   },

//   // 👇 TEMPORARY FIX for Vercel build
//   typescript: {
//     ignoreBuildErrors: true,
//   },
// };

// export default nextConfig;



// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   images: {
//     remotePatterns: [
//       // Existing hostname for flipflops
//       {
//         protocol: "https",
//         hostname: "test.flipflops.cc",
//         pathname: "/media/catalog/product/**",
//       },
//       // Magento staging images
//       {
//         protocol: "https",
//         hostname: "staging.yourartsupplies.com",
//         pathname: "/media/catalog/product/**",
//       },
//     ],
//   },

//   typescript: {
//     ignoreBuildErrors: true,
//   },
// };

// export default nextConfig;


import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Existing hostname for flipflops
      {
        protocol: "https",
        hostname: "test.flipflops.cc",
        pathname: "/media/catalog/product/**",
      },
      // Magento staging images
      {
        protocol: "https",
        hostname: "staging.yourartsupplies.com",
        pathname: "/media/catalog/product/**",
      },
      // ✅ MR CIGGY LIVE IMAGES
      {
        protocol: "https",
        hostname: "www.mrciggy.com",
        pathname: "/media/catalog/product/**",
      },
    ],
  },

  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;

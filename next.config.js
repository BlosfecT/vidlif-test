// export default {
//   images: {
//     domains: ["utfs.io"],
//   },
//   webpack: (config) => {
//     config.module.rules.push({
//       test: /\.mjs$/,
//       include: /node_modules/,
//       type: "javascript/auto",
//     });
//     return config;
//   },
// }; 



// import type { nextConfig } from "next";

// const nextConfig: NextConfig = {
//   images: {
//     domains: [
//       "utfs.io",
//     ],
//   },
//   /* config options here */
//   webpack: (config) => {
//     config.module.rules.push({
//       test: /\.mjs$/,
//       include: /node_modules/,
//       type: "javascript/auto",
//     });
//     return config;
//   },
// };

// export default nextConfig; 



/* @type {import('next').NextConfig}*/
const nextConfig = {
images: {
   domains: [
    "utfs.io",
   ],
},
webpack: (config) => {
  config.module.rules.push({
    test: /\.mjs$/,
    include: /node_modules/,
    type: "javascript/auto",
  });
     return config;

},
}; 

module.exports = nextConfig

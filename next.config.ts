// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
//   reactCompiler: true,
// };

// export default nextConfig;

import type { NextConfig } from "next";
import withLinaria, { LinariaConfig } from 'next-with-linaria';

const nextConfig: NextConfig & LinariaConfig = {
  /* config options here */
  reactCompiler: true,
  linaria: {
    // Linaria options (optional)
  },
};

export default withLinaria(nextConfig);
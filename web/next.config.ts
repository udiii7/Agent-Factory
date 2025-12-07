import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  // Explicitly set Turbopack root to this package to avoid Next inferring the workspace root
  turbopack: {
    root: path.resolve(__dirname),
  },
  // Allow 127.0.0.1 dev origin to request /_next/* resources (silences future cross-origin warnings)
  allowedDevOrigins: ["http://127.0.0.1"],
};

export default nextConfig;

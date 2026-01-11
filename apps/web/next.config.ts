import "@finance-assets-web/env/web";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	basePath: process.env.BASE_PATH || "",
	output: "standalone",
	typedRoutes: true,
	reactCompiler: true,
};

export default nextConfig;

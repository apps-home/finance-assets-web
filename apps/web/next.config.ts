import '@finance-assets-web/env/web'

import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	basePath: process.env.BASE_PATH || '',
	output: 'standalone',
	typedRoutes: true,
	reactCompiler: true,
	transpilePackages: ['@t3-oss/env-nextjs', '@t3-oss/env-core'],
	...(process.env.NODE_ENV === 'development' && {
		allowedDevOrigins: [
			'http://localhost:3000',
			'http://localhost:3001',
			'http://10.0.2.124:3001',
			'10.0.2.124',
			'192.168.0.9'
		]
	})
}

export default nextConfig

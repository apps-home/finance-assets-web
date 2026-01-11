import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
	emptyStringAsUndefined: true,
	runtimeEnv: {
		NEXT_PUBLIC_SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL ?? "",
		NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL ?? "",
		NEXT_PUBLIC_BASE_PATH: process.env.NEXT_PUBLIC_BASE_PATH ?? "",
		BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET ?? "",
		BETTER_AUTH_URL: process.env.BETTER_AUTH_URL ?? "",
		DATABASE_URL: process.env.DATABASE_URL ?? "",
	},
});

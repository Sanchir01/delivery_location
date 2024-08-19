import { defineConfig } from 'drizzle-kit'
export default defineConfig({
	schema: './src/drizzle/schema.ts',
	dialect: 'postgresql',
	out: './migrations',
	dbCredentials: {
		host: process.env.DB_HOST,
		port: Number(process.env.DB_PORT),
		database: process.env.DB_NAME,
		user: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		ssl: true
	},
	strict: true,
	verbose: true
})

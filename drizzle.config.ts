import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';
export default defineConfig({
  schema: './config/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: 'postgresql://online-school_owner:omLC2VeIFyE0@ep-bold-truth-a5auno8e.us-east-2.aws.neon.tech/AI-content_generator?sslmode=require',
  },
});

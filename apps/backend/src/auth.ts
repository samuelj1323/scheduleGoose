import "dotenv/config";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "./db/index"; 
import * as schema from "./db/schema"; // Import schema

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg", 
    schema: schema, // Explicitly pass schema to fix "verification model not found" error
  }),
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      scope: ["https://www.googleapis.com/auth/youtube.upload", "https://www.googleapis.com/auth/youtube.readonly"],
      accessType: "offline", // Ensure we get a refresh token
      prompt: "consent", // Force consent to get refresh token on re-login
    },
  },
  trustedOrigins: ["http://localhost:3000"], 
});

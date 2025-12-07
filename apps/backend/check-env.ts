import "dotenv/config";

console.log("Checking Environment Variables for Auth...");
console.log("BETTER_AUTH_URL:", process.env.BETTER_AUTH_URL);
console.log("BETTER_AUTH_SECRET exists:", !!process.env.BETTER_AUTH_SECRET);
console.log("GOOGLE_CLIENT_ID exists:", !!process.env.GOOGLE_CLIENT_ID);
console.log("GOOGLE_CLIENT_SECRET exists:", !!process.env.GOOGLE_CLIENT_SECRET);
console.log("DATABASE_URL exists:", !!process.env.DATABASE_URL);


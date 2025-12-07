import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import dotenv from 'dotenv';

dotenv.config();

const client = postgres(process.env.DATABASE_URL!);

async function reset() {
  console.log('Resetting database...');
  await client`DROP TABLE IF EXISTS "content" CASCADE`;
  await client`DROP TABLE IF EXISTS "users" CASCADE`;
  await client`DROP TABLE IF EXISTS "session" CASCADE`;
  await client`DROP TABLE IF EXISTS "account" CASCADE`;
  await client`DROP TABLE IF EXISTS "verification" CASCADE`;
  console.log('Database reset complete.');
  process.exit(0);
}

reset();


import dotenv from 'dotenv';
import path from 'path';

// Load .env file
dotenv.config();

const requiredEnv = [
  'SUPABASE_URL',
  'SUPABASE_ANON_KEY',
];

// Validate critical parameters (warn if missing/mocked)
for (const key of requiredEnv) {
  if (!process.env[key] || process.env[key].startsWith('your-')) {
    console.warn(`[WARNING] Missing or default environment variable: ${key}. Local mocks/fallbacks will be active.`);
  }
}

export const env = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  supabaseUrl: process.env.SUPABASE_URL,
  supabaseAnonKey: process.env.SUPABASE_ANON_KEY,
  supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
  openrouterApiKey: process.env.OPENROUTER_API_KEY,
  openrouterModel: process.env.OPENROUTER_MODEL || 'meta-llama/llama-3-8b-instruct:free',
  typesenseApiKey: process.env.TYPESENSE_API_KEY,
  typesenseHost: process.env.TYPESENSE_HOST || 'localhost',
  typesensePort: process.env.TYPESENSE_PORT || '8108',
  typesenseProtocol: process.env.TYPESENSE_PROTOCOL || 'http',
};

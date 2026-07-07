import app from './app.js';
import { env } from './config/env.js';

const PORT = env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log('');
  console.log('╔══════════════════════════════════════════════════════════╗');
  console.log('║         WFX AI-Native ERP Platform — Backend             ║');
  console.log('╠══════════════════════════════════════════════════════════╣');
  console.log(`║  🚀 Server running at  http://localhost:${PORT}           ║`);
  console.log(`║  🌍 Environment:       ${(env.NODE_ENV || 'development').padEnd(35)}║`);
  console.log(`║  🗄️  Database:          ${(env.supabaseUrl && !env.supabaseUrl.includes('mock') ? 'Supabase (Live)' : 'Mock DB (Offline)').padEnd(34)}║`);
  console.log(`║  🔍 Search:            ${(env.typesenseApiKey && !env.typesenseApiKey.includes('mock') ? 'Typesense (Live)' : 'Local Fallback').padEnd(34)}║`);
  console.log(`║  🤖 AI Engine:         ${(env.openrouterApiKey && !env.openrouterApiKey.includes('mock') ? 'OpenRouter (Live)' : 'Mock Responses').padEnd(33)}║`);
  console.log('╠══════════════════════════════════════════════════════════╣');
  console.log('║  📋 API Docs:          http://localhost:' + PORT + '              ║');
  console.log('║  ❤️  Health Check:     http://localhost:' + PORT + '/api/health  ║');
  console.log('╚══════════════════════════════════════════════════════════╝');
  console.log('');
});

// Graceful shutdown handlers
process.on('unhandledRejection', (err) => {
  console.error('❌ UNHANDLED REJECTION! Shutting down gracefully...');
  console.error(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

process.on('uncaughtException', (err) => {
  console.error('❌ UNCAUGHT EXCEPTION! Shutting down gracefully...');
  console.error(err.name, err.message);
  process.exit(1);
});

process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  server.close(() => {
    console.log('Process terminated.');
  });
});

export default server;

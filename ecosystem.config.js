// ============================================================
// PM2 Ecosystem Config — Nao-POS Production (Hostinger)
// Jalankan di server: pm2 start ecosystem.config.js
// ============================================================

module.exports = {
  apps: [
    {
      name: 'nao-pos',
      script: 'node_modules/.bin/next',
      args: 'start',
      cwd: './',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '512M',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
    },
  ],
};

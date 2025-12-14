// PM2 ecosystem - Editor: Tomas Galea
module.exports = {
  apps: [
    {
      name: 'rifas-backend',
      script: 'index.js',
      instances: 'max',
      autorestart: true,
      watch: false,
      env: {
        NODE_ENV: 'production'
      }
    }
  ]
};

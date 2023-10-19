module.exports = {
    apps: [
        {
            name: 'server-app',
            script: 'build/bin/www.js',
            instances: 1,
            exec_mode: 'cluster',
            autorestart: true,
            watch: false,
            max_memory_restart: '200M',
            env: {
                NODE_ENV: 'production',
                NODE_LANG: 'JS'
            }
        }
    ]
};

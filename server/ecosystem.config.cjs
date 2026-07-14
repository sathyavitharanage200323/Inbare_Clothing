module.exports = {
    apps: [
        {
            name: "inbare-api",
            script: "src/server.js",
            instances: "max",
            exec_mode: "cluster",
            env_production: {
                NODE_ENV: "production",
            },
            max_memory_restart: "500M",
            error_file: "logs/pm2-error.log",
            out_file: "logs/pm2-out.log",
            merge_logs: true,
            log_date_format: "YYYY-MM-DD HH:mm:ss Z",
        },
    ],
};

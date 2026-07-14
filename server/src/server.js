import config from "./config/env.js";
import app from "./app.js";
import connectDatabase from "./config/database.js";
import logger from "./utils/logger.js";

connectDatabase();

const server = app.listen(config.PORT, () => {
    logger.info(`🚀 Server running in ${config.NODE_ENV} mode on port ${config.PORT}`);
    logger.info(`📚 API Docs: http://localhost:${config.PORT}/api-docs`);
});

process.on("unhandledRejection", (err) => {
    logger.error(`Unhandled Rejection: ${err.message}`);
    server.close(() => process.exit(1));
});

process.on("uncaughtException", (err) => {
    logger.error(`Uncaught Exception: ${err.message}`);
    server.close(() => process.exit(1));
});

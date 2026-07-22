import config from "./config/env.js";
import app from "./app.js";
import connectDatabase from "./config/database.js";
import logger from "./utils/logger.js";
import User from "./models/User.js";
import "./models/index.js"; // Import models and associations

async function seedAdmin() {
    try {
        const existing = await User.findOne({ where: { email: config.ADMIN_EMAIL } });
        if (!existing) {
            await User.create({
                firstName: "Admin",
                lastName: "INBARE",
                email: config.ADMIN_EMAIL,
                password: config.ADMIN_PASSWORD,
                role: "admin",
                isEmailVerified: true,
            });
            logger.info("✅ Admin user created from environment variables");
        }
    } catch (error) {
        logger.error("Failed to seed admin user:", error.message);
    }
}

async function start() {
    await connectDatabase();
    await seedAdmin();

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
}

start();

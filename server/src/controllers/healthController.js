import config from "../config/env.js";

const healthCheck = async (req, res) => {
    const health = {
        status: "ok",
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: config.NODE_ENV,
        memory: process.memoryUsage(),
    };

    try {
        const mongoose = await import("mongoose");
        health.database = mongoose.default.connection.readyState === 1 ? "connected" : "disconnected";
    } catch {
        health.database = "error";
    }

    const statusCode = health.database === "connected" ? 200 : 503;
    res.status(statusCode).json(health);
};

export default healthCheck;

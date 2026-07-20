import dotenv from "dotenv";

dotenv.config();

const required = ["JWT_SECRET"];
const missing = required.filter((key) => !process.env[key]);

if (missing.length > 0) {
    console.error(`❌ Missing required environment variables: ${missing.join(", ")}`);
    process.exit(1);
}

const config = {
    NODE_ENV: process.env.NODE_ENV || "development",
    PORT: parseInt(process.env.PORT, 10) || 5000,
    DB_HOST: process.env.DB_HOST || "localhost",
    DB_PORT: parseInt(process.env.DB_PORT, 10) || 3306,
    DB_NAME: process.env.DB_NAME || "inbare_clothing",
    DB_USER: process.env.DB_USER || "root",
    DB_PASSWORD: process.env.DB_PASSWORD || "",
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRE: process.env.JWT_EXPIRE || "7d",
    CORS_ORIGIN: process.env.CORS_ORIGIN || "http://localhost:5173",
    SMTP_HOST: process.env.SMTP_HOST || "",
    SMTP_PORT: parseInt(process.env.SMTP_PORT, 10) || 587,
    SMTP_USER: process.env.SMTP_USER || "",
    SMTP_PASS: process.env.SMTP_PASS || "",
    EMAIL_FROM: process.env.EMAIL_FROM || "noreply@inbare.com",
    CLIENT_URL: process.env.CLIENT_URL || "http://localhost:5173",
};

export default config;

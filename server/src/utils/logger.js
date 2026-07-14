import winston from "winston";
import "winston-mongodb";

const { combine, timestamp, printf, colorize, json } = winston.format;

const consoleFormat = printf(({ level, message, timestamp: ts }) => {
    return `${ts} [${level}]: ${message}`;
});

const transports = [
    new winston.transports.Console({
        format: combine(colorize(), timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), consoleFormat),
    }),
];

if (process.env.NODE_ENV === "production") {
    transports.push(
        new winston.transports.File({
            filename: "logs/error.log",
            level: "error",
            format: combine(timestamp(), json()),
            maxsize: 5242880,
            maxFiles: 5,
        }),
        new winston.transports.File({
            filename: "logs/combined.log",
            format: combine(timestamp(), json()),
            maxsize: 5242880,
            maxFiles: 5,
        })
    );
}

const logger = winston.createLogger({
    level: process.env.NODE_ENV === "production" ? "info" : "debug",
    transports,
});

export default logger;

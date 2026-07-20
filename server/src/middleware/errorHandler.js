const errorHandler = (err, req, res, next) => {
    let error = { ...err };
    error.message = err.message;

    console.error(err.stack);

    if (err.name === "SequelizeValidationError") {
        const messages = err.errors.map((val) => val.message);
        return res.status(400).json({ success: false, message: messages.join(", ") });
    }

    if (err.name === "SequelizeUniqueConstraintError") {
        const field = err.errors[0]?.path || "field";
        error.message = `Duplicate value for field: ${field}`;
        return res.status(400).json({ success: false, message: error.message });
    }

    if (err.name === "SequelizeDatabaseError") {
        error.message = "Invalid data provided";
        return res.status(400).json({ success: false, message: error.message });
    }

    if (err.name === "JsonWebTokenError") {
        return res.status(401).json({ success: false, message: "Invalid token" });
    }

    if (err.name === "TokenExpiredError") {
        return res.status(401).json({ success: false, message: "Token expired" });
    }

    res.status(err.statusCode || 500).json({
        success: false,
        message: error.message || "Internal Server Error",
    });
};

export default errorHandler;

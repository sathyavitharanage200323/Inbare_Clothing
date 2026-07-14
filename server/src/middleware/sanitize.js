import mongoSanitize from "mongo-sanitize";

const sanitize = (req, res, next) => {
    if (req.body) req.body = mongoSanitize(req.body);
    if (req.query) req.query = mongoSanitize(req.query);
    if (req.params) req.params = mongoSanitize(req.params);
    next();
};

export default sanitize;

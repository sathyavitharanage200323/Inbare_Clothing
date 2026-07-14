import Review from "../models/Review.js";
import Product from "../models/Product.js";

export const getAllReviews = async (req, res, next) => {
    try {
        const { page = 1, limit = 20, rating } = req.query;

        const query = {};
        if (rating) query.rating = Number(rating);

        const total = await Review.countDocuments(query);
        const reviews = await Review.find(query)
            .populate("user", "firstName lastName email avatar")
            .populate("product", "name slug images")
            .sort({ createdAt: -1 })
            .skip((Number(page) - 1) * Number(limit))
            .limit(Number(limit));

        res.status(200).json({
            success: true,
            count: reviews.length,
            total,
            totalPages: Math.ceil(total / Number(limit)),
            currentPage: Number(page),
            reviews,
        });
    } catch (error) {
        next(error);
    }
};

export const getProductReviews = async (req, res, next) => {
    try {
        const reviews = await Review.find({ product: req.params.productId })
            .populate("user", "firstName lastName avatar")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: reviews.length,
            reviews,
        });
    } catch (error) {
        next(error);
    }
};

export const createReview = async (req, res, next) => {
    try {
        const { rating, comment } = req.body;
        const { productId } = req.params;

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        const existingReview = await Review.findOne({
            product: productId,
            user: req.user._id,
        });

        if (existingReview) {
            return res.status(400).json({
                success: false,
                message: "You have already reviewed this product",
            });
        }

        const review = await Review.create({
            product: productId,
            user: req.user._id,
            rating,
            comment,
        });

        res.status(201).json({
            success: true,
            message: "Review created successfully",
            review,
        });
    } catch (error) {
        next(error);
    }
};

export const updateReview = async (req, res, next) => {
    try {
        const { rating, comment } = req.body;

        let review = await Review.findById(req.params.id);

        if (!review) {
            return res.status(404).json({
                success: false,
                message: "Review not found",
            });
        }

        if (review.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: "Not authorized to update this review",
            });
        }

        review.rating = rating;
        review.comment = comment;
        await review.save();

        res.status(200).json({
            success: true,
            message: "Review updated successfully",
            review,
        });
    } catch (error) {
        next(error);
    }
};

export const deleteReview = async (req, res, next) => {
    try {
        const review = await Review.findById(req.params.id);

        if (!review) {
            return res.status(404).json({
                success: false,
                message: "Review not found",
            });
        }

        if (
            review.user.toString() !== req.user._id.toString() &&
            req.user.role !== "admin"
        ) {
            return res.status(403).json({
                success: false,
                message: "Not authorized to delete this review",
            });
        }

        await Review.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: "Review deleted successfully",
        });
    } catch (error) {
        next(error);
    }
};

import Review from "../models/Review.js";
import Product from "../models/Product.js";
import User from "../models/User.js";

export const getAllReviews = async (req, res, next) => {
    try {
        const { page = 1, limit = 20, rating } = req.query;

        const where = {};
        if (rating) where.rating = Number(rating);

        const total = await Review.count({ where });
        const reviews = await Review.findAll({
            where,
            include: [
                { model: User, as: 'user', attributes: ['id', 'firstName', 'lastName', 'email', 'avatar'] },
                { model: Product, as: 'product', attributes: ['id', 'name', 'slug', 'images'] }
            ],
            order: [['createdAt', 'DESC']],
            offset: (Number(page) - 1) * Number(limit),
            limit: Number(limit),
        });

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
        const reviews = await Review.findAll({
            where: { productId: req.params.productId },
            include: [
                { model: User, as: 'user', attributes: ['id', 'firstName', 'lastName', 'avatar'] }
            ],
            order: [['createdAt', 'DESC']],
        });

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

        const product = await Product.findByPk(productId);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        const existingReview = await Review.findOne({
            where: { productId, userId: req.user.id }
        });

        if (existingReview) {
            return res.status(400).json({
                success: false,
                message: "You have already reviewed this product",
            });
        }

        const review = await Review.create({
            productId,
            userId: req.user.id,
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

        const review = await Review.findByPk(req.params.id);

        if (!review) {
            return res.status(404).json({
                success: false,
                message: "Review not found",
            });
        }

        if (review.userId !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "Not authorized to update this review",
            });
        }

        await review.update({ rating, comment });

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
        const review = await Review.findByPk(req.params.id);

        if (!review) {
            return res.status(404).json({
                success: false,
                message: "Review not found",
            });
        }

        if (review.userId !== req.user.id && req.user.role !== "admin") {
            return res.status(403).json({
                success: false,
                message: "Not authorized to delete this review",
            });
        }

        await review.destroy();

        res.status(200).json({
            success: true,
            message: "Review deleted successfully",
        });
    } catch (error) {
        next(error);
    }
};

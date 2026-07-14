import Wishlist from "../models/Wishlist.js";

export const getAllWishlists = async (req, res, next) => {
    try {
        const { page = 1, limit = 20 } = req.query;

        const total = await Wishlist.countDocuments();
        const wishlists = await Wishlist.find()
            .populate("user", "firstName lastName email avatar")
            .populate("products", "name price discountPrice images slug")
            .sort({ createdAt: -1 })
            .skip((Number(page) - 1) * Number(limit))
            .limit(Number(limit));

        res.status(200).json({
            success: true,
            count: wishlists.length,
            total,
            totalPages: Math.ceil(total / Number(limit)),
            currentPage: Number(page),
            wishlists,
        });
    } catch (error) {
        next(error);
    }
};

export const getWishlist = async (req, res, next) => {
    try {
        let wishlist = await Wishlist.findOne({ user: req.user._id }).populate(
            "products",
            "name price discountPrice images slug averageRating"
        );

        if (!wishlist) {
            wishlist = await Wishlist.create({ user: req.user._id, products: [] });
        }

        res.status(200).json({
            success: true,
            wishlist,
        });
    } catch (error) {
        next(error);
    }
};

export const toggleWishlist = async (req, res, next) => {
    try {
        const { productId } = req.body;

        let wishlist = await Wishlist.findOne({ user: req.user._id });

        if (!wishlist) {
            wishlist = new Wishlist({ user: req.user._id, products: [] });
        }

        const index = wishlist.products.indexOf(productId);

        let message;
        if (index > -1) {
            wishlist.products.splice(index, 1);
            message = "Product removed from wishlist";
        } else {
            wishlist.products.push(productId);
            message = "Product added to wishlist";
        }

        await wishlist.save();

        wishlist = await Wishlist.findOne({ user: req.user._id }).populate(
            "products",
            "name price discountPrice images slug averageRating"
        );

        res.status(200).json({
            success: true,
            message,
            wishlist,
        });
    } catch (error) {
        next(error);
    }
};

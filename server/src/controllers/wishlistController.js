import Wishlist from "../models/Wishlist.js";
import Product from "../models/Product.js";
import User from "../models/User.js";

const populateWishlistProducts = async (wishlist) => {
    if (!wishlist || !wishlist.products || wishlist.products.length === 0) return wishlist;
    const productIds = wishlist.products;
    const products = await Product.findAll({
        where: { id: productIds },
        attributes: ['id', 'name', 'price', 'discountPrice', 'images', 'slug', 'averageRating']
    });
    const productMap = Object.fromEntries(products.map(p => [p.id, p.toJSON()]));
    const plainWishlist = wishlist.toJSON ? wishlist.toJSON() : { ...wishlist };
    plainWishlist.products = wishlist.products.map(id => productMap[id] || id);
    return plainWishlist;
};

export const getAllWishlists = async (req, res, next) => {
    try {
        const { page = 1, limit = 20 } = req.query;

        const total = await Wishlist.count();
        const wishlists = await Wishlist.findAll({
            include: [
                { model: User, as: 'user', attributes: ['id', 'firstName', 'lastName', 'email', 'avatar'] }
            ],
            order: [['createdAt', 'DESC']],
            offset: (Number(page) - 1) * Number(limit),
            limit: Number(limit),
        });

        const populatedWishlists = await Promise.all(wishlists.map(async (w) => {
            const plain = w.toJSON();
            if (plain.products && plain.products.length > 0) {
                const products = await Product.findAll({
                    where: { id: plain.products },
                    attributes: ['id', 'name', 'price', 'discountPrice', 'images', 'slug']
                });
                const productMap = Object.fromEntries(products.map(p => [p.id, p.toJSON()]));
                plain.products = plain.products.map(id => productMap[id] || id);
            }
            return plain;
        }));

        res.status(200).json({
            success: true,
            count: populatedWishlists.length,
            total,
            totalPages: Math.ceil(total / Number(limit)),
            currentPage: Number(page),
            wishlists: populatedWishlists,
        });
    } catch (error) {
        next(error);
    }
};

export const getWishlist = async (req, res, next) => {
    try {
        let wishlist = await Wishlist.findOne({ where: { userId: req.user.id } });

        if (!wishlist) {
            wishlist = await Wishlist.create({ userId: req.user.id, products: [] });
        }

        const populatedWishlist = await populateWishlistProducts(wishlist);

        res.status(200).json({
            success: true,
            wishlist: populatedWishlist,
        });
    } catch (error) {
        next(error);
    }
};

export const toggleWishlist = async (req, res, next) => {
    try {
        const { productId } = req.body;

        let wishlist = await Wishlist.findOne({ where: { userId: req.user.id } });

        if (!wishlist) {
            wishlist = await Wishlist.create({ userId: req.user.id, products: [] });
        }

        const products = [...wishlist.products];
        const index = products.indexOf(productId);

        let message;
        if (index > -1) {
            products.splice(index, 1);
            message = "Product removed from wishlist";
        } else {
            products.push(productId);
            message = "Product added to wishlist";
        }

        await wishlist.update({ products });

        const updatedWishlist = await Wishlist.findOne({ where: { userId: req.user.id } });
        const populatedWishlist = await populateWishlistProducts(updatedWishlist);

        res.status(200).json({
            success: true,
            message,
            wishlist: populatedWishlist,
        });
    } catch (error) {
        next(error);
    }
};

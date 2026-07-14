import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

export const getCart = async (req, res, next) => {
    try {
        let cart = await Cart.findOne({ user: req.user._id }).populate(
            "items.product",
            "name price images slug"
        );

        if (!cart) {
            cart = await Cart.create({ user: req.user._id, items: [] });
        }

        res.status(200).json({
            success: true,
            cart,
        });
    } catch (error) {
        next(error);
    }
};

export const addToCart = async (req, res, next) => {
    try {
        const { productId, quantity = 1, size = "", color = "" } = req.body;

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        if (product.stock < quantity) {
            return res.status(400).json({
                success: false,
                message: "Insufficient stock",
            });
        }

        let cart = await Cart.findOne({ user: req.user._id });

        if (!cart) {
            cart = new Cart({ user: req.user._id, items: [] });
        }

        const existingItemIndex = cart.items.findIndex(
            (item) =>
                item.product.toString() === productId &&
                item.size === size &&
                item.color === color
        );

        if (existingItemIndex > -1) {
            cart.items[existingItemIndex].quantity += quantity;
        } else {
            cart.items.push({
                product: productId,
                name: product.name,
                price: product.discountPrice || product.price,
                image: product.images[0] || "",
                size,
                color,
                quantity,
            });
        }

        await cart.save();

        cart = await Cart.findOne({ user: req.user._id }).populate(
            "items.product",
            "name price images slug"
        );

        res.status(200).json({
            success: true,
            message: "Item added to cart",
            cart,
        });
    } catch (error) {
        next(error);
    }
};

export const updateCartItem = async (req, res, next) => {
    try {
        const { quantity } = req.body;
        const { productId, size, color } = req.params;

        if (quantity < 1) {
            return res.status(400).json({
                success: false,
                message: "Quantity must be at least 1",
            });
        }

        const cart = await Cart.findOne({ user: req.user._id });
        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found",
            });
        }

        const itemIndex = cart.items.findIndex(
            (item) =>
                item.product.toString() === productId &&
                item.size === (size || "") &&
                item.color === (color || "")
        );

        if (itemIndex === -1) {
            return res.status(404).json({
                success: false,
                message: "Item not found in cart",
            });
        }

        const product = await Product.findById(productId);
        if (product && product.stock < quantity) {
            return res.status(400).json({
                success: false,
                message: `Insufficient stock. Only ${product.stock} available.`,
            });
        }

        cart.items[itemIndex].quantity = quantity;
        await cart.save();

        const updatedCart = await Cart.findOne({ user: req.user._id }).populate(
            "items.product",
            "name price images slug"
        );

        res.status(200).json({
            success: true,
            message: "Cart updated",
            cart: updatedCart,
        });
    } catch (error) {
        next(error);
    }
};

export const removeFromCart = async (req, res, next) => {
    try {
        const { productId, size, color } = req.params;

        const cart = await Cart.findOne({ user: req.user._id });
        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found",
            });
        }

        cart.items = cart.items.filter(
            (item) =>
                !(
                    item.product.toString() === productId &&
                    item.size === (size || "") &&
                    item.color === (color || "")
                )
        );

        await cart.save();

        const updatedCart = await Cart.findOne({ user: req.user._id }).populate(
            "items.product",
            "name price images slug"
        );

        res.status(200).json({
            success: true,
            message: "Item removed from cart",
            cart: updatedCart,
        });
    } catch (error) {
        next(error);
    }
};

export const clearCart = async (req, res, next) => {
    try {
        const cart = await Cart.findOne({ user: req.user._id });
        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found",
            });
        }

        cart.items = [];
        await cart.save();

        res.status(200).json({
            success: true,
            message: "Cart cleared",
            cart,
        });
    } catch (error) {
        next(error);
    }
};

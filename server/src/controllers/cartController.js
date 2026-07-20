import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

const populateCartProducts = async (cart) => {
    if (!cart || !cart.items || cart.items.length === 0) return cart;
    const productIds = cart.items.map(i => i.product);
    const products = await Product.findAll({
        where: { id: productIds },
        attributes: ['id', 'name', 'price', 'discountPrice', 'images', 'slug']
    });
    const productMap = Object.fromEntries(products.map(p => [p.id, p.toJSON()]));
    const plainCart = cart.toJSON ? cart.toJSON() : { ...cart };
    plainCart.items = cart.items.map(item => ({
        ...item,
        product: productMap[item.product] || item.product
    }));
    return plainCart;
};

export const getCart = async (req, res, next) => {
    try {
        let cart = await Cart.findOne({ where: { userId: req.user.id } });

        if (!cart) {
            cart = await Cart.create({ userId: req.user.id, items: [] });
        }

        const populatedCart = await populateCartProducts(cart);

        res.status(200).json({
            success: true,
            cart: populatedCart,
        });
    } catch (error) {
        next(error);
    }
};

export const addToCart = async (req, res, next) => {
    try {
        const { productId, quantity = 1, size = "", color = "" } = req.body;

        const product = await Product.findByPk(productId);
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

        let cart = await Cart.findOne({ where: { userId: req.user.id } });

        if (!cart) {
            cart = await Cart.create({ userId: req.user.id, items: [] });
        }

        const items = [...cart.items];
        const existingItemIndex = items.findIndex(
            (item) =>
                String(item.product) === String(productId) &&
                item.size === size &&
                item.color === color
        );

        if (existingItemIndex > -1) {
            items[existingItemIndex].quantity += quantity;
        } else {
            items.push({
                product: productId,
                name: product.name,
                price: product.discountPrice || product.price,
                image: (product.images && product.images[0]) || "",
                size,
                color,
                quantity,
            });
        }

        await cart.update({ items });

        const updatedCart = await Cart.findOne({ where: { userId: req.user.id } });
        const populatedCart = await populateCartProducts(updatedCart);

        res.status(200).json({
            success: true,
            message: "Item added to cart",
            cart: populatedCart,
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

        const cart = await Cart.findOne({ where: { userId: req.user.id } });
        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found",
            });
        }

        const itemIndex = cart.items.findIndex(
            (item) =>
                String(item.product) === String(productId) &&
                item.size === (size || "") &&
                item.color === (color || "")
        );

        if (itemIndex === -1) {
            return res.status(404).json({
                success: false,
                message: "Item not found in cart",
            });
        }

        const product = await Product.findByPk(productId);
        if (product && product.stock < quantity) {
            return res.status(400).json({
                success: false,
                message: `Insufficient stock. Only ${product.stock} available.`,
            });
        }

        const items = [...cart.items];
        items[itemIndex].quantity = quantity;
        await cart.update({ items });

        const updatedCart = await Cart.findOne({ where: { userId: req.user.id } });
        const populatedCart = await populateCartProducts(updatedCart);

        res.status(200).json({
            success: true,
            message: "Cart updated",
            cart: populatedCart,
        });
    } catch (error) {
        next(error);
    }
};

export const removeFromCart = async (req, res, next) => {
    try {
        const { productId, size, color } = req.params;

        const cart = await Cart.findOne({ where: { userId: req.user.id } });
        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found",
            });
        }

        const items = cart.items.filter(
            (item) =>
                !(
                    String(item.product) === String(productId) &&
                    item.size === (size || "") &&
                    item.color === (color || "")
                )
        );

        await cart.update({ items });

        const updatedCart = await Cart.findOne({ where: { userId: req.user.id } });
        const populatedCart = await populateCartProducts(updatedCart);

        res.status(200).json({
            success: true,
            message: "Item removed from cart",
            cart: populatedCart,
        });
    } catch (error) {
        next(error);
    }
};

export const clearCart = async (req, res, next) => {
    try {
        const cart = await Cart.findOne({ where: { userId: req.user.id } });
        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found",
            });
        }

        await cart.update({ items: [] });

        res.status(200).json({
            success: true,
            message: "Cart cleared",
            cart,
        });
    } catch (error) {
        next(error);
    }
};

import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";
import User from "../models/User.js";
import Coupon from "../models/Coupon.js";
import { sendOrderConfirmation } from "../utils/email.js";
import { sequelize } from "../config/database.js";

export const createOrder = async (req, res, next) => {
    try {
        const { shippingAddress, paymentMethod, note, couponCode } = req.body;

        const cart = await Cart.findOne({ where: { userId: req.user.id } });
        if (!cart || !cart.items || cart.items.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Cart is empty",
            });
        }

        for (const item of cart.items) {
            const product = await Product.findByPk(item.product);
            if (!product) {
                return res.status(404).json({
                    success: false,
                    message: `Product not found: ${item.name}`,
                });
            }
            if (product.stock < item.quantity) {
                return res.status(400).json({
                    success: false,
                    message: `Insufficient stock for ${item.name}`,
                });
            }
        }

        let totalAmount = cart.totalAmount;
        let discountAmount = 0;
        let appliedCouponCode = null;

        if (couponCode) {
            const coupon = await Coupon.findOne({ where: { code: couponCode.toUpperCase() } });
            if (!coupon || !coupon.isActive) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid coupon code",
                });
            }
            if (coupon.expiresAt && coupon.expiresAt < new Date()) {
                return res.status(400).json({
                    success: false,
                    message: "This coupon has expired",
                });
            }
            if (coupon.maxUses !== null && coupon.usedCount >= coupon.maxUses) {
                return res.status(400).json({
                    success: false,
                    message: "This coupon has reached its usage limit",
                });
            }
            if (totalAmount < coupon.minOrderAmount) {
                return res.status(400).json({
                    success: false,
                    message: `Minimum order amount for this coupon is LKR ${coupon.minOrderAmount}`,
                });
            }

            if (coupon.discountType === "percent") {
                discountAmount = Math.round((totalAmount * coupon.discountValue) / 100);
            } else {
                discountAmount = Math.min(coupon.discountValue, totalAmount);
            }

            totalAmount = Math.max(0, totalAmount - discountAmount);
            appliedCouponCode = coupon.code;
            coupon.usedCount += 1;
            await coupon.save();
        }

        const order = await Order.create({
            userId: req.user.id,
            items: cart.items.map((item) => ({
                product: item.product,
                name: item.name,
                price: item.price,
                image: item.image,
                size: item.size,
                color: item.color,
                quantity: item.quantity,
            })),
            street: shippingAddress.street,
            city: shippingAddress.city,
            state: shippingAddress.state,
            zipCode: shippingAddress.zipCode,
            country: shippingAddress.country || 'Sri Lanka',
            paymentMethod,
            totalAmount,
            note,
            couponCode: appliedCouponCode,
            discountAmount,
        });

        for (const item of cart.items) {
            const product = await Product.findByPk(item.product);
            if (!product || product.stock < item.quantity) {
                await order.destroy();
                return res.status(400).json({
                    success: false,
                    message: `Insufficient stock for ${item.name}`,
                });
            }
            await product.update({
                stock: sequelize.literal('stock - ' + item.quantity)
            });
        }

        await cart.update({ items: [] });

        const orderUser = await User.findByPk(req.user.id);
        if (orderUser) sendOrderConfirmation(order, orderUser);

        res.status(201).json({
            success: true,
            message: "Order placed successfully",
            order,
        });
    } catch (error) {
        next(error);
    }
};

export const getMyOrders = async (req, res, next) => {
    try {
        const { page = 1, limit = 10 } = req.query;

        const total = await Order.count({ where: { userId: req.user.id } });
        const orders = await Order.findAll({
            where: { userId: req.user.id },
            order: [['createdAt', 'DESC']],
            offset: (Number(page) - 1) * Number(limit),
            limit: Number(limit),
        });

        res.status(200).json({
            success: true,
            count: orders.length,
            total,
            totalPages: Math.ceil(total / Number(limit)),
            currentPage: Number(page),
            orders,
        });
    } catch (error) {
        next(error);
    }
};

export const getOrder = async (req, res, next) => {
    try {
        const order = await Order.findByPk(req.params.id, {
            include: [{ model: User, as: 'user', attributes: ['id', 'firstName', 'lastName', 'email'] }]
        });

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found",
            });
        }

        if (order.userId !== req.user.id && req.user.role !== "admin") {
            return res.status(403).json({
                success: false,
                message: "Not authorized to view this order",
            });
        }

        res.status(200).json({
            success: true,
            order,
        });
    } catch (error) {
        next(error);
    }
};

export const getAllOrders = async (req, res, next) => {
    try {
        const { page = 1, limit = 10, status } = req.query;

        const where = {};
        if (status) where.orderStatus = status;

        const total = await Order.count({ where });
        const orders = await Order.findAll({
            where,
            include: [{ model: User, as: 'user', attributes: ['id', 'firstName', 'lastName', 'email'] }],
            order: [['createdAt', 'DESC']],
            offset: (Number(page) - 1) * Number(limit),
            limit: Number(limit),
        });

        res.status(200).json({
            success: true,
            count: orders.length,
            total,
            totalPages: Math.ceil(total / Number(limit)),
            currentPage: Number(page),
            orders,
        });
    } catch (error) {
        next(error);
    }
};

export const updateOrderStatus = async (req, res, next) => {
    try {
        const { orderStatus, paymentStatus } = req.body;

        const order = await Order.findByPk(req.params.id);
        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found",
            });
        }

        const updates = {};
        if (orderStatus) updates.orderStatus = orderStatus;
        if (paymentStatus) updates.paymentStatus = paymentStatus;
        await order.update(updates);

        res.status(200).json({
            success: true,
            message: "Order updated successfully",
            order,
        });
    } catch (error) {
        next(error);
    }
};

export const cancelOrder = async (req, res, next) => {
    try {
        const order = await Order.findByPk(req.params.id);

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found",
            });
        }

        if (order.userId !== req.user.id && req.user.role !== "admin") {
            return res.status(403).json({
                success: false,
                message: "Not authorized to cancel this order",
            });
        }

        if (!["pending", "processing"].includes(order.orderStatus)) {
            return res.status(400).json({
                success: false,
                message: "Order cannot be cancelled at this stage",
            });
        }

        for (const item of order.items) {
            const product = await Product.findByPk(item.product);
            if (product) {
                await product.update({
                    stock: sequelize.literal('stock + ' + item.quantity)
                });
            }
        }

        await order.update({ orderStatus: "cancelled" });

        res.status(200).json({
            success: true,
            message: "Order cancelled successfully",
            order,
        });
    } catch (error) {
        next(error);
    }
};

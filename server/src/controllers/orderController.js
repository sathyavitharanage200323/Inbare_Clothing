import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

export const createOrder = async (req, res, next) => {
    try {
        const { shippingAddress, paymentMethod, note } = req.body;

        const cart = await Cart.findOne({ user: req.user._id });
        if (!cart || cart.items.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Cart is empty",
            });
        }

        for (const item of cart.items) {
            const product = await Product.findById(item.product);
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

        const totalAmount = cart.totalAmount;

        const order = await Order.create({
            user: req.user._id,
            items: cart.items.map((item) => ({
                product: item.product,
                name: item.name,
                price: item.price,
                image: item.image,
                size: item.size,
                color: item.color,
                quantity: item.quantity,
            })),
            shippingAddress,
            paymentMethod,
            totalAmount,
            note,
        });

        for (const item of cart.items) {
            const result = await Product.findOneAndUpdate(
                { _id: item.product, stock: { $gte: item.quantity } },
                { $inc: { stock: -item.quantity } },
                { new: true }
            );

            if (!result) {
                await Order.findByIdAndDelete(order._id);
                return res.status(400).json({
                    success: false,
                    message: `Insufficient stock for ${item.name}`,
                });
            }
        }

        cart.items = [];
        await cart.save();

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

        const total = await Order.countDocuments({ user: req.user._id });
        const orders = await Order.find({ user: req.user._id })
            .sort({ createdAt: -1 })
            .skip((Number(page) - 1) * Number(limit))
            .limit(Number(limit));

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
        const order = await Order.findById(req.params.id).populate(
            "user",
            "firstName lastName email"
        );

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found",
            });
        }

        if (
            order.user._id.toString() !== req.user._id.toString() &&
            req.user.role !== "admin"
        ) {
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

        const query = {};
        if (status) query.orderStatus = status;

        const total = await Order.countDocuments(query);
        const orders = await Order.find(query)
            .populate("user", "firstName lastName email")
            .sort({ createdAt: -1 })
            .skip((Number(page) - 1) * Number(limit))
            .limit(Number(limit));

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

        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found",
            });
        }

        if (orderStatus) order.orderStatus = orderStatus;
        if (paymentStatus) order.paymentStatus = paymentStatus;

        await order.save();

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
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found",
            });
        }

        if (
            order.user.toString() !== req.user._id.toString() &&
            req.user.role !== "admin"
        ) {
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
            await Product.findByIdAndUpdate(item.product, {
                $inc: { stock: item.quantity },
            });
        }

        order.orderStatus = "cancelled";
        await order.save();

        res.status(200).json({
            success: true,
            message: "Order cancelled successfully",
            order,
        });
    } catch (error) {
        next(error);
    }
};

import Order from "../models/Order.js";
import Product from "../models/Product.js";
import User from "../models/User.js";
import Category from "../models/Category.js";

export const getDashboardStats = async (req, res, next) => {
    try {
        const [totalProducts, totalUsers, totalCategories, totalOrders, revenueResult, recentOrders, ordersByStatus, lowStockProducts] = await Promise.all([
            Product.countDocuments(),
            User.countDocuments({ role: "customer" }),
            Category.countDocuments(),
            Order.countDocuments(),
            Order.aggregate([
                { $group: { _id: null, total: { $sum: "$totalAmount" } } },
            ]),
            Order.find()
                .populate("user", "firstName lastName email")
                .sort({ createdAt: -1 })
                .limit(5),
            Order.aggregate([
                { $group: { _id: "$orderStatus", count: { $sum: 1 } } },
            ]),
            Product.find({ stock: { $lte: 10 } })
                .select("name stock price")
                .sort({ stock: 1 })
                .limit(5),
        ]);

        const totalRevenue = revenueResult.length > 0 ? revenueResult[0].total : 0;

        const statusMap = {};
        ordersByStatus.forEach((s) => {
            statusMap[s._id] = s.count;
        });

        res.status(200).json({
            success: true,
            stats: {
                totalProducts,
                totalUsers,
                totalCategories,
                totalOrders,
                totalRevenue,
                recentOrders,
                ordersByStatus: statusMap,
                lowStockProducts,
            },
        });
    } catch (error) {
        next(error);
    }
};

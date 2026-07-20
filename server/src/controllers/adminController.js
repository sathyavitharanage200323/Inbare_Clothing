import Order from "../models/Order.js";
import Product from "../models/Product.js";
import User from "../models/User.js";
import Category from "../models/Category.js";
import { fn, col, Op } from "sequelize";

export const getDashboardStats = async (req, res, next) => {
    try {
        const [totalProducts, totalUsers, totalCategories, totalOrders, totalRevenue, recentOrders, ordersByStatus, lowStockProducts] = await Promise.all([
            Product.count(),
            User.count({ where: { role: "customer" } }),
            Category.count(),
            Order.count(),
            Order.sum('totalAmount'),
            Order.findAll({
                include: [{ model: User, as: 'user', attributes: ['id', 'firstName', 'lastName', 'email'] }],
                order: [['createdAt', 'DESC']],
                limit: 5,
            }),
            Order.findAll({
                attributes: ['orderStatus', [fn('COUNT', col('id')), 'count']],
                group: ['orderStatus'],
            }),
            Product.findAll({
                where: { stock: { [Op.lte]: 10 } },
                attributes: ['id', 'name', 'stock', 'price'],
                order: [['stock', 'ASC']],
                limit: 5,
            }),
        ]);

        const statusMap = {};
        ordersByStatus.forEach((s) => {
            statusMap[s.orderStatus] = Number(s.get('count'));
        });

        res.status(200).json({
            success: true,
            stats: {
                totalProducts,
                totalUsers,
                totalCategories,
                totalOrders,
                totalRevenue: totalRevenue || 0,
                recentOrders,
                ordersByStatus: statusMap,
                lowStockProducts,
            },
        });
    } catch (error) {
        next(error);
    }
};

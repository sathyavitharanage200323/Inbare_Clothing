import User from "../models/User.js";

export const getUsers = async (req, res, next) => {
    try {
        const { page = 1, limit = 10, role } = req.query;

        const where = {};
        if (role) where.role = role;

        const total = await User.count({ where });
        const users = await User.findAll({
            where,
            order: [['createdAt', 'DESC']],
            offset: (Number(page) - 1) * Number(limit),
            limit: Number(limit),
        });

        res.status(200).json({
            success: true,
            count: users.length,
            total,
            totalPages: Math.ceil(total / Number(limit)),
            currentPage: Number(page),
            users,
        });
    } catch (error) {
        next(error);
    }
};

export const getUser = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.params.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        res.status(200).json({
            success: true,
            user,
        });
    } catch (error) {
        next(error);
    }
};

export const updateUser = async (req, res, next) => {
    try {
        const { firstName, lastName, email, role, phone, street, city, state, zipCode, country, isActive } = req.body;

        const user = await User.findByPk(req.params.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        await user.update({ firstName, lastName, email, role, phone, street, city, state, zipCode, country, isActive });

        res.status(200).json({
            success: true,
            message: "User updated successfully",
            user,
        });
    } catch (error) {
        next(error);
    }
};

export const deleteUser = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.params.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        await user.destroy();

        res.status(200).json({
            success: true,
            message: "User deleted successfully",
        });
    } catch (error) {
        next(error);
    }
};

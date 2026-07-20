import Coupon from "../models/Coupon.js";

export const validateCoupon = async (req, res, next) => {
    try {
        const { code } = req.body;

        if (!code) {
            return res.status(400).json({
                success: false,
                message: "Coupon code is required",
            });
        }

        const coupon = await Coupon.findOne({ where: { code: code.toUpperCase() } });

        if (!coupon) {
            return res.status(404).json({
                success: false,
                message: "Invalid coupon code",
            });
        }

        if (!coupon.isActive) {
            return res.status(400).json({
                success: false,
                message: "This coupon is no longer active",
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

        res.status(200).json({
            success: true,
            coupon: {
                code: coupon.code,
                discountType: coupon.discountType,
                discountValue: coupon.discountValue,
                minOrderAmount: coupon.minOrderAmount,
            },
        });
    } catch (error) {
        next(error);
    }
};

export const getAllCoupons = async (req, res, next) => {
    try {
        const { page = 1, limit = 20 } = req.query;

        const total = await Coupon.count();
        const coupons = await Coupon.findAll({
            order: [['createdAt', 'DESC']],
            offset: (Number(page) - 1) * Number(limit),
            limit: Number(limit),
        });

        res.status(200).json({
            success: true,
            count: coupons.length,
            total,
            totalPages: Math.ceil(total / Number(limit)),
            currentPage: Number(page),
            coupons,
        });
    } catch (error) {
        next(error);
    }
};

export const createCoupon = async (req, res, next) => {
    try {
        const { code, discountType, discountValue, minOrderAmount, maxUses, expiresAt, isActive } = req.body;

        const existing = await Coupon.findOne({ where: { code: code.toUpperCase() } });
        if (existing) {
            return res.status(400).json({
                success: false,
                message: "Coupon with this code already exists",
            });
        }

        const coupon = await Coupon.create({
            code: code.toUpperCase(),
            discountType,
            discountValue,
            minOrderAmount,
            maxUses,
            expiresAt,
            isActive,
        });

        res.status(201).json({
            success: true,
            message: "Coupon created successfully",
            coupon,
        });
    } catch (error) {
        next(error);
    }
};

export const updateCoupon = async (req, res, next) => {
    try {
        const coupon = await Coupon.findByPk(req.params.id);
        if (!coupon) {
            return res.status(404).json({
                success: false,
                message: "Coupon not found",
            });
        }

        const { code, discountType, discountValue, minOrderAmount, maxUses, expiresAt, isActive } = req.body;
        if (code) coupon.code = code.toUpperCase();
        if (discountType) coupon.discountType = discountType;
        if (discountValue !== undefined) coupon.discountValue = discountValue;
        if (minOrderAmount !== undefined) coupon.minOrderAmount = minOrderAmount;
        if (maxUses !== undefined) coupon.maxUses = maxUses;
        if (expiresAt !== undefined) coupon.expiresAt = expiresAt;
        if (isActive !== undefined) coupon.isActive = isActive;

        await coupon.save();

        res.status(200).json({
            success: true,
            message: "Coupon updated successfully",
            coupon,
        });
    } catch (error) {
        next(error);
    }
};

export const deleteCoupon = async (req, res, next) => {
    try {
        const coupon = await Coupon.findByPk(req.params.id);
        if (!coupon) {
            return res.status(404).json({
                success: false,
                message: "Coupon not found",
            });
        }

        await coupon.destroy();

        res.status(200).json({
            success: true,
            message: "Coupon deleted successfully",
        });
    } catch (error) {
        next(error);
    }
};

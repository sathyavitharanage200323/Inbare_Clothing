import mongoose from "mongoose";

const couponSchema = new mongoose.Schema(
    {
        code: {
            type: String,
            required: [true, "Coupon code is required"],
            unique: true,
            uppercase: true,
            trim: true,
        },
        discountType: {
            type: String,
            enum: ["percent", "fixed"],
            required: true,
        },
        discountValue: {
            type: Number,
            required: true,
            min: [0, "Discount value must be positive"],
        },
        minOrderAmount: {
            type: Number,
            default: 0,
        },
        maxUses: {
            type: Number,
            default: null,
        },
        usedCount: {
            type: Number,
            default: 0,
        },
        expiresAt: {
            type: Date,
            default: null,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
);

couponSchema.index({ code: 1 });
couponSchema.index({ isActive: 1, expiresAt: 1 });

const Coupon = mongoose.model("Coupon", couponSchema);

export default Coupon;

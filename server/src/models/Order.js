import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema(
    {
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        image: {
            type: String,
            default: "",
        },
        size: {
            type: String,
            default: "",
        },
        color: {
            type: String,
            default: "",
        },
        quantity: {
            type: Number,
            required: true,
            min: [1, "Quantity must be at least 1"],
        },
    },
    { _id: false }
);

const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        items: [orderItemSchema],
        shippingAddress: {
            street: { type: String, required: true },
            city: { type: String, required: true },
            state: { type: String, required: true },
            zipCode: { type: String, required: true },
            country: { type: String, required: true, default: "Sri Lanka" },
        },
        paymentMethod: {
            type: String,
            required: [true, "Payment method is required"],
            enum: ["cod", "card", "bank_transfer"],
            default: "cod",
        },
        paymentStatus: {
            type: String,
            enum: ["pending", "paid", "failed", "refunded"],
            default: "pending",
        },
        orderStatus: {
            type: String,
            enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
            default: "pending",
        },
        totalAmount: {
            type: Number,
            required: true,
            min: [0, "Total cannot be negative"],
        },
        shippingCost: {
            type: Number,
            default: 0,
        },
        note: {
            type: String,
            trim: true,
            maxlength: [500, "Note cannot exceed 500 characters"],
        },
        couponCode: {
            type: String,
            default: null,
        },
        discountAmount: {
            type: Number,
            default: 0,
            min: [0, "Discount cannot be negative"],
        },
    },
    {
        timestamps: true,
    }
);

orderSchema.index({ user: 1, createdAt: -1 });
orderSchema.index({ orderStatus: 1 });
orderSchema.index({ paymentStatus: 1 });

const Order = mongoose.model("Order", orderSchema);

export default Order;

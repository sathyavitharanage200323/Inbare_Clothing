import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema(
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
            default: 1,
        },
    },
    { _id: false }
);

const cartSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true,
        },
        items: [cartItemSchema],
        totalAmount: {
            type: Number,
            default: 0,
            min: [0, "Total cannot be negative"],
        },
    },
    {
        timestamps: true,
    }
);

cartSchema.pre("save", function (next) {
    this.totalAmount = this.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );
    next();
});

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;

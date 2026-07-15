import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Product name is required"],
            trim: true,
            maxlength: [200, "Product name cannot exceed 200 characters"],
        },
        slug: {
            type: String,
            unique: true,
            lowercase: true,
        },
        description: {
            type: String,
            required: [true, "Product description is required"],
            maxlength: [2000, "Description cannot exceed 2000 characters"],
        },
        price: {
            type: Number,
            required: [true, "Product price is required"],
            min: [0, "Price cannot be negative"],
        },
        discountPrice: {
            type: Number,
            default: 0,
            min: [0, "Discount price cannot be negative"],
            validate: {
                validator: function (value) {
                    // value of 0 means no discount — always valid
                    if (value === 0) return true;
                    // In document context (save/create), this.price is available
                    // In query context (findByIdAndUpdate), use this.getUpdate()
                    const price =
                        this.price !== undefined
                            ? this.price
                            : this.getUpdate?.()?.price;
                    if (price === undefined) return true; // can't compare, skip
                    return value < price;
                },
                message: "Discount price must be less than regular price",
            },
        },
        images: [
            {
                type: mongoose.Schema.Types.ObjectId,
            },
        ],
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: [true, "Product category is required"],
        },
        colors: [
            {
                type: String,
                trim: true,
            },
        ],
        sizes: [
            {
                type: String,
                trim: true,
            },
        ],
        stock: {
            type: Number,
            required: [true, "Stock quantity is required"],
            min: [0, "Stock cannot be negative"],
            default: 0,
        },
        isFeatured: {
            type: Boolean,
            default: false,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        averageRating: {
            type: Number,
            default: 0,
            min: [0, "Rating cannot be less than 0"],
            max: [5, "Rating cannot exceed 5"],
        },
        numReviews: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

productSchema.pre("save", function (next) {
    if (this.isModified("name")) {
        this.slug = this.name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "");
    }
    next();
});

productSchema.index({ category: 1 });
productSchema.index({ price: 1 });
productSchema.index({ isFeatured: 1 });
productSchema.index({ isActive: 1 });
productSchema.index({ name: "text", description: "text" });

const Product = mongoose.model("Product", productSchema);

export default Product;

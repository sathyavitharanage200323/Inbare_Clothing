import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
    {
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        rating: {
            type: Number,
            required: [true, "Rating is required"],
            min: [1, "Rating must be at least 1"],
            max: [5, "Rating cannot exceed 5"],
        },
        comment: {
            type: String,
            trim: true,
            maxlength: [1000, "Comment cannot exceed 1000 characters"],
        },
    },
    {
        timestamps: true,
    }
);

reviewSchema.index({ product: 1, user: 1 }, { unique: true });
reviewSchema.index({ product: 1, createdAt: -1 });

reviewSchema.statics.calcAverageRating = async function (productId) {
    const stats = await this.aggregate([
        { $match: { product: productId } },
        {
            $group: {
                _id: "$product",
                averageRating: { $avg: "$rating" },
                numReviews: { $sum: 1 },
            },
        },
    ]);

    const Product = mongoose.model("Product");
    if (stats.length > 0) {
        await Product.findByIdAndUpdate(productId, {
            averageRating: Math.round(stats[0].averageRating * 10) / 10,
            numReviews: stats[0].numReviews,
        });
    } else {
        await Product.findByIdAndUpdate(productId, {
            averageRating: 0,
            numReviews: 0,
        });
    }
};

reviewSchema.post("save", function () {
    this.constructor.calcAverageRating(this.product);
});

reviewSchema.post("findOneAndDelete", function (doc) {
    if (doc) {
        doc.constructor.calcAverageRating(doc.product);
    }
});

const Review = mongoose.model("Review", reviewSchema);

export default Review;

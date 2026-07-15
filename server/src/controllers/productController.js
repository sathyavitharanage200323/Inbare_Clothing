import Product from "../models/Product.js";
import { deleteFile } from "../utils/gridfs.js";

export const getProducts = async (req, res, next) => {
    try {
        const {
            page = 1,
            limit = 10,
            category,
            minPrice,
            maxPrice,
            search,
            featured,
            sort = "-createdAt",
            all = "false",
        } = req.query;

        const query = {};

        if (all !== "true") {
            query.isActive = true;
        }

        if (category) query.category = category;
        if (featured === "true") query.isFeatured = true;
        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = Number(minPrice);
            if (maxPrice) query.price.$lte = Number(maxPrice);
        }
        if (search) {
            query.$text = { $search: search };
        }

        const total = await Product.countDocuments(query);
        const products = await Product.find(query)
            .populate("category", "name slug")
            .sort(sort)
            .skip((Number(page) - 1) * Number(limit))
            .limit(Number(limit));

        res.status(200).json({
            success: true,
            count: products.length,
            total,
            totalPages: Math.ceil(total / Number(limit)),
            currentPage: Number(page),
            products,
        });
    } catch (error) {
        next(error);
    }
};

export const getProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id).populate(
            "category",
            "name slug"
        );

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        res.status(200).json({
            success: true,
            product,
        });
    } catch (error) {
        next(error);
    }
};

export const getProductBySlug = async (req, res, next) => {
    try {
        const product = await Product.findOne({ slug: req.params.slug }).populate(
            "category",
            "name slug"
        );

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        res.status(200).json({
            success: true,
            product,
        });
    } catch (error) {
        next(error);
    }
};

export const createProduct = async (req, res, next) => {
    try {
        const { name, description, price, discountPrice, images, category, colors, sizes, stock, isFeatured, isActive } = req.body;
        const product = await Product.create({ name, description, price, discountPrice, images, category, colors, sizes, stock, isFeatured, isActive });

        res.status(201).json({
            success: true,
            message: "Product created successfully",
            product,
        });
    } catch (error) {
        next(error);
    }
};

export const updateProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        const { name, description, price, discountPrice, images, category, colors, sizes, stock, isFeatured, isActive } = req.body;
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            { name, description, price, discountPrice, images, category, colors, sizes, stock, isFeatured, isActive },
            { new: true, runValidators: true, context: 'query' }
        );

        res.status(200).json({
            success: true,
            message: "Product updated successfully",
            product: updatedProduct,
        });
    } catch (error) {
        next(error);
    }
};

export const deleteProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        for (const imageId of product.images) {
            await deleteFile(imageId);
        }

        await Product.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: "Product deleted successfully",
        });
    } catch (error) {
        next(error);
    }
};

export const getFeaturedProducts = async (req, res, next) => {
    try {
        const products = await Product.find({ isFeatured: true, isActive: true })
            .populate("category", "name slug")
            .limit(8);

        res.status(200).json({
            success: true,
            count: products.length,
            products,
        });
    } catch (error) {
        next(error);
    }
};

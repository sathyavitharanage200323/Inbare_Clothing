import Category from "../models/Category.js";
import Product from "../models/Product.js";
import { fn, col, literal } from "sequelize";
import { deleteFile } from "../utils/gridfs.js";

export const getCategories = async (req, res, next) => {
    try {
        const { withCount } = req.query;

        if (withCount === "true") {
            const categories = await Category.findAll({
                order: [['createdAt', 'DESC']],
                attributes: {
                    include: [
                        [fn('COUNT', col('products.id')), 'productCount'],
                        [fn('SUM', literal("CASE WHEN products.isActive = 1 THEN 1 ELSE 0 END")), 'activeCount']
                    ]
                },
                include: [{ model: Product, as: 'products', attributes: [] }],
                group: ['Category.id'],
                subQuery: false
            });

            return res.status(200).json({
                success: true,
                count: categories.length,
                categories,
            });
        }

        const categories = await Category.findAll({
            order: [['createdAt', 'DESC']]
        });

        res.status(200).json({
            success: true,
            count: categories.length,
            categories,
        });
    } catch (error) {
        next(error);
    }
};

export const getCategory = async (req, res, next) => {
    try {
        const category = await Category.findByPk(req.params.id);

        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found",
            });
        }

        res.status(200).json({
            success: true,
            category,
        });
    } catch (error) {
        next(error);
    }
};

export const createCategory = async (req, res, next) => {
    try {
        const { name, description, image, isActive } = req.body;

        const existingCategory = await Category.findOne({ where: { name } });
        if (existingCategory) {
            return res.status(400).json({
                success: false,
                message: "Category with this name already exists",
            });
        }

        const category = await Category.create({ name, description, image, isActive });

        res.status(201).json({
            success: true,
            message: "Category created successfully",
            category,
        });
    } catch (error) {
        next(error);
    }
};

export const updateCategory = async (req, res, next) => {
    try {
        const category = await Category.findByPk(req.params.id);

        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found",
            });
        }

        const { name, description, image, isActive } = req.body;
        await category.update({ name, description, image, isActive });

        res.status(200).json({
            success: true,
            message: "Category updated successfully",
            category,
        });
    } catch (error) {
        next(error);
    }
};

export const deleteCategory = async (req, res, next) => {
    try {
        const category = await Category.findByPk(req.params.id);

        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found",
            });
        }

        if (category.image) {
            try {
                await deleteFile(category.image);
            } catch (e) {
                // GridFS may not be available with SQLite
            }
        }

        await category.destroy();

        res.status(200).json({
            success: true,
            message: "Category deleted successfully",
        });
    } catch (error) {
        next(error);
    }
};

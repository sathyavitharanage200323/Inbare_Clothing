import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const Category = sequelize.define('Category', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: { msg: "Category name is required" },
            len: { args: [1, 100], msg: "Category name cannot exceed 100 characters" }
        }
    },
    slug: {
        type: DataTypes.STRING(120),
        unique: true
    },
    description: {
        type: DataTypes.STRING(500),
        allowNull: true,
        validate: {
            len: { args: [0, 500], msg: "Description cannot exceed 500 characters" }
        }
    },
    image: {
        type: DataTypes.STRING(500),
        allowNull: true
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    _id: {
        type: DataTypes.VIRTUAL,
        get() { return this.id; }
    }
}, {
    tableName: 'categories',
    timestamps: true,
    indexes: [
        { fields: ['isActive'] },
        { fields: ['slug'] }
    ],
    hooks: {
        beforeSave: (category) => {
            if (category.changed('name')) {
                category.slug = category.name
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, "-")
                    .replace(/(^-|-$)/g, "");
            }
        }
    }
});

export default Category;

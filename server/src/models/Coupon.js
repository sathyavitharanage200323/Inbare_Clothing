import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const Coupon = sequelize.define('Coupon', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    code: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: { msg: "Coupon code is required" }
        },
        set(value) {
            this.setDataValue('code', value.toUpperCase().trim());
        }
    },
    discountType: {
        type: DataTypes.ENUM('percent', 'fixed'),
        allowNull: false
    },
    discountValue: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
            min: { args: [0], msg: "Discount value must be positive" }
        }
    },
    minOrderAmount: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0
    },
    maxUses: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    usedCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    expiresAt: {
        type: DataTypes.DATE,
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
    tableName: 'coupons',
    timestamps: true,
    indexes: [
        { fields: ['code'], unique: true },
        { fields: ['isActive', 'expiresAt'] }
    ]
});

export default Coupon;

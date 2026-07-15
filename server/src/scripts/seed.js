import mongoose from "mongoose";
import dotenv from "dotenv";
import Category from "../models/Category.js";
import Product from "../models/Product.js";
import User from "../models/User.js";

dotenv.config();

const categories = [
    { name: "T-Shirts", slug: "t-shirts", description: "Premium cotton tees for everyday wear" },
    { name: "Hoodies", slug: "hoodies", description: "Comfortable hoodies for all seasons" },
    { name: "Jackets", slug: "jackets", description: "Outerwear for every occasion" },
    { name: "Accessories", slug: "accessories", description: "Complete your look" },
    { name: "Tote Bags", slug: "tote-bags", description: "Handcrafted canvas tote bags" },
];

const products = [
    { name: "Classic White Tee", description: "Premium cotton classic white t-shirt", price: 3500, stock: 50, category: "T-Shirts", colors: ["White", "Black"], sizes: ["XS", "S", "M", "L", "XL"] },
    { name: "Washed Black Tee", description: "Vintage wash black t-shirt", price: 3800, stock: 35, category: "T-Shirts", colors: ["Black", "Washed"], sizes: ["S", "M", "L", "XL"] },
    { name: "Oversized Graphic Tee", description: "Oversized fit graphic print tee", price: 4200, stock: 40, category: "T-Shirts", colors: ["Multi"], sizes: ["M", "L", "XL", "XXL"] },
    { name: "Crop Top", description: "Fitted crop top for layering", price: 3600, stock: 30, category: "T-Shirts", colors: ["Black", "White", "Brown"], sizes: ["XS", "S", "M", "L"] },
    { name: "Essential Rib Tee", description: "Ribbed texture everyday tee", price: 3200, stock: 60, category: "T-Shirts", colors: ["Ash", "Black", "Light Ash", "Pink", "Red", "White"], sizes: ["XS", "S", "M", "L", "XL"] },
    { name: "Longline Pocket Tee", description: "Extended length pocket tee", price: 3900, stock: 25, category: "T-Shirts", colors: ["Burgundy", "Charcoal", "White"], sizes: ["S", "M", "L", "XL"] },
    { name: "Classic Pullover Hoodie", description: "Heavyweight pullover hoodie", price: 5500, stock: 45, category: "Hoodies", colors: ["Navy", "Black", "Beige", "Pink", "Blue", "Brown"], sizes: ["S", "M", "L", "XL", "XXL"] },
    { name: "Zip-Up Tech Hoodie", description: "Technical zip-up hoodie", price: 6000, stock: 30, category: "Hoodies", colors: ["Burgundy", "Slate Blue"], sizes: ["M", "L", "XL"] },
    { name: "Field Jacket", description: "Utility field jacket", price: 6000, stock: 20, category: "Jackets", sizes: ["S", "M", "L", "XL"] },
    { name: "Leather Moto Jacket", description: "Classic leather motorcycle jacket", price: 6000, stock: 15, category: "Jackets", sizes: ["S", "M", "L", "XL"] },
    { name: "Jhumkas", description: "Traditional Sri Lankan jhumka earrings", price: 4500, stock: 50, category: "Accessories", sizes: ["One Size"] },
    { name: "Necklaces", description: "Handcrafted silver necklaces", price: 5200, stock: 40, category: "Accessories", sizes: ["One Size"] },
    { name: "Desi Bangle", description: "Traditional desi bangles", price: 3800, stock: 60, category: "Accessories", sizes: ["One Size"] },
    { name: "Earrings", description: "Contemporary earring collection", price: 4200, stock: 45, category: "Accessories", sizes: ["One Size"] },
    { name: "The Natural Tote", description: "Natural canvas tote bag", price: 1200, stock: 100, category: "Tote Bags", sizes: ["One Size"] },
    { name: "Washed Canvas Tote", description: "Vintage washed canvas tote", price: 1400, stock: 80, category: "Tote Bags", sizes: ["One Size"] },
    { name: "Heritage Carry Bag", description: "Heritage style carry bag", price: 1600, stock: 70, category: "Tote Bags", sizes: ["One Size"] },
    { name: "Premium Cargo Pant", description: "Utility cargo pant", price: 6990, stock: 25, category: "T-Shirts", colors: ["Khaki", "Black"], sizes: ["S", "M", "L", "XL"] },
];

async function seed() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");

        await Category.deleteMany({});
        await Product.deleteMany({});
        console.log("Cleared existing data");

        const createdCategories = await Category.insertMany(categories);
        console.log(`Seeded ${createdCategories.length} categories`);

        const categoryMap = {};
        createdCategories.forEach((cat) => {
            categoryMap[cat.name] = cat._id;
        });

        const productsWithCategory = products.map((p) => ({
            ...p,
            category: categoryMap[p.category],
            images: [],
        }));

        const createdProducts = [];
        for (const p of productsWithCategory) {
            const created = await Product.create(p);
            createdProducts.push(created);
        }
        console.log(`Seeded ${createdProducts.length} products`);

        const existingAdmin = await User.findOne({ email: "admin@inbare.com" });
        if (!existingAdmin) {
            await User.create({
                firstName: "Admin",
                lastName: "INBARE",
                email: "admin@inbare.com",
                password: "admin123",
                role: "admin",
                isEmailVerified: true,
            });
            console.log("Created admin user: admin@inbare.com / admin123");
        }

        console.log("Seed complete!");
        process.exit(0);
    } catch (error) {
        console.error("Seed failed:", error);
        process.exit(1);
    }
}

seed();

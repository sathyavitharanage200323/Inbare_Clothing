import mongoose from "mongoose";
import dotenv from "dotenv";
import { GridFSBucket, ObjectId } from "mongodb";
import { Readable } from "stream";
import Product from "../models/Product.js";
import Category from "../models/Category.js";

dotenv.config();

const BUCKET_NAME = "images";

async function migrate() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");

        const db = mongoose.connection.db;
        const oldCollection = db.collection("images");
        const oldCount = await oldCollection.countDocuments();

        if (oldCount === 0) {
            console.log("No images in old collection. Nothing to migrate.");
            process.exit(0);
        }

        console.log(`Found ${oldCount} images to migrate`);

        const bucket = new GridFSBucket(db, { bucketName: BUCKET_NAME });
        const idMap = {};

        const oldImages = await oldCollection.find().toArray();
        for (const oldImage of oldImages) {
            const filename = `${Date.now()}-${oldImage.name}`;

            const fileId = await new Promise((resolve, reject) => {
                const uploadStream = bucket.openUploadStream(filename, {
                    contentType: oldImage.contentType,
                    metadata: { originalName: oldImage.name },
                });

                uploadStream.on("error", reject);
                uploadStream.on("finish", () => resolve(uploadStream.id));

                Readable.from(oldImage.data.buffer).pipe(uploadStream);
            });

            idMap[oldImage._id.toString()] = fileId;
            console.log(`Migrated: ${oldImage.name} -> ${fileId}`);
        }

        console.log("\nUpdating product references...");

        const products = await Product.find({ images: { $exists: true, $ne: [] } });
        for (const product of products) {
            let updated = false;
            for (let i = 0; i < product.images.length; i++) {
                const oldId = product.images[i].toString();
                if (idMap[oldId]) {
                    product.images[i] = idMap[oldId];
                    updated = true;
                }
            }
            if (updated) {
                await product.save();
                console.log(`Updated product: ${product.name}`);
            }
        }

        console.log("\nUpdating category references...");

        const categories = await Category.find({ image: { $ne: null } });
        for (const category of categories) {
            const oldId = category.image.toString();
            if (idMap[oldId]) {
                category.image = idMap[oldId];
                await category.save();
                console.log(`Updated category: ${category.name}`);
            }
        }

        console.log("\nDropping old images collection...");
        await oldCollection.drop();
        console.log("Old collection dropped");

        console.log("\nMigration complete!");
        process.exit(0);
    } catch (error) {
        console.error("Migration failed:", error);
        process.exit(1);
    }
}

migrate();

import mongoose from "mongoose";
import { GridFSBucket, ObjectId } from "mongodb";
import { Readable } from "stream";

const BUCKET_NAME = "images";

function getBucket() {
    const db = mongoose.connection.db;
    if (!db) throw new Error("Database not connected");
    return new GridFSBucket(db, { bucketName: BUCKET_NAME });
}

export async function uploadFile(file) {
    const bucket = getBucket();
    const filename = `${Date.now()}-${file.originalname}`;

    return new Promise((resolve, reject) => {
        const uploadStream = bucket.openUploadStream(filename, {
            contentType: file.mimetype,
            metadata: { originalName: file.originalname },
        });

        uploadStream.on("error", reject);
        uploadStream.on("finish", () => resolve(uploadStream.id));

        Readable.from(file.buffer).pipe(uploadStream);
    });
}

export async function downloadFile(fileId) {
    const bucket = getBucket();
    const id = new ObjectId(fileId);

    const filesCollection = mongoose.connection.db.collection(`${BUCKET_NAME}.files`);
    const fileDoc = await filesCollection.findOne({ _id: id });
    if (!fileDoc) return null;

    const downloadStream = bucket.openDownloadStream(id);

    return {
        stream: downloadStream,
        contentType: fileDoc.contentType || "application/octet-stream",
        filename: fileDoc.filename,
        size: fileDoc.length,
    };
}

export async function deleteFile(fileId) {
    const bucket = getBucket();
    const id = new ObjectId(fileId);

    try {
        await bucket.delete(id);
    } catch (err) {
        if (err.code === "ENOENT" || err.message?.includes("FileNotFound")) return;
        throw err;
    }
}

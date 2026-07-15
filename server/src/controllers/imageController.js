import { uploadFile, downloadFile, deleteFile } from "../utils/gridfs.js";

export const uploadImages = async (req, res, next) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ success: false, message: "No files uploaded" });
        }

        const imageIds = await Promise.all(
            req.files.map(async (file) => {
                return await uploadFile(file);
            })
        );

        res.status(200).json({ success: true, images: imageIds });
    } catch (error) {
        next(error);
    }
};

export const getImage = async (req, res, next) => {
    try {
        const result = await downloadFile(req.params.id);

        if (!result) {
            return res.status(404).json({ success: false, message: "Image not found" });
        }

        res.set("Content-Type", result.contentType);
        res.set("Cache-Control", "public, max-age=31536000");
        res.set("Cross-Origin-Resource-Policy", "cross-origin");
        res.set("Access-Control-Allow-Origin", "*");
        result.stream.pipe(res);
    } catch (error) {
        next(error);
    }
};

export const deleteImage = async (req, res, next) => {
    try {
        await deleteFile(req.params.id);

        res.status(200).json({ success: true, message: "Image deleted successfully" });
    } catch (error) {
        next(error);
    }
};

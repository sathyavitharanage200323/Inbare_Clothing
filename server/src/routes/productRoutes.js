import { Router } from "express";
import {
    getProducts,
    getProduct,
    getProductBySlug,
    createProduct,
    updateProduct,
    deleteProduct,
    getFeaturedProducts,
} from "../controllers/productController.js";
import { uploadImages } from "../controllers/imageController.js";
import { protect, authorize } from "../middleware/auth.js";
import { uploadMultiple } from "../config/upload.js";

const router = Router();

router.get("/", getProducts);
router.get("/featured", getFeaturedProducts);
router.get("/slug/:slug", getProductBySlug);
router.get("/:id", getProduct);
router.post("/", protect, authorize("admin"), createProduct);
router.post("/upload", protect, authorize("admin"), (req, res, next) => {
    uploadMultiple(req, res, (err) => {
        if (err) return next(err);
        uploadImages(req, res, next);
    });
});
router.put("/:id", protect, authorize("admin"), updateProduct);
router.delete("/:id", protect, authorize("admin"), deleteProduct);

export default router;

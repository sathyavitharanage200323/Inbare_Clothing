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
import { protect, authorize } from "../middleware/auth.js";
import { uploadMultiple } from "../config/cloudinary.js";

const router = Router();

router.get("/", getProducts);
router.get("/featured", getFeaturedProducts);
router.get("/slug/:slug", getProductBySlug);
router.get("/:id", getProduct);
router.post("/", protect, authorize("admin"), createProduct);
router.post("/upload", protect, authorize("admin"), uploadMultiple, (req, res) => {
    if (!req.files || req.files.length === 0) {
        return res.status(400).json({ success: false, message: "No files uploaded" });
    }
    const urls = req.files.map((f) => f.path);
    res.status(200).json({ success: true, images: urls });
});
router.put("/:id", protect, authorize("admin"), updateProduct);
router.delete("/:id", protect, authorize("admin"), deleteProduct);

export default router;

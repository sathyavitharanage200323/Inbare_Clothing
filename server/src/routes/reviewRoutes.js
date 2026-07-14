import { Router } from "express";
import {
    getAllReviews,
    getProductReviews,
    createReview,
    updateReview,
    deleteReview,
} from "../controllers/reviewController.js";
import { protect, authorize } from "../middleware/auth.js";

const router = Router();

router.get("/", protect, authorize("admin"), getAllReviews);
router.get("/product/:productId", getProductReviews);
router.post("/product/:productId", protect, createReview);
router.put("/:id", protect, updateReview);
router.delete("/:id", protect, deleteReview);

export default router;

import { Router } from "express";
import { getAllWishlists, getWishlist, toggleWishlist } from "../controllers/wishlistController.js";
import { protect, authorize } from "../middleware/auth.js";

const router = Router();

router.get("/", protect, authorize("admin"), getAllWishlists);
router.get("/my", protect, getWishlist);
router.post("/toggle", protect, toggleWishlist);

export default router;

import { Router } from "express";
import { getImage, deleteImage } from "../controllers/imageController.js";
import { protect, authorize } from "../middleware/auth.js";

const router = Router();

router.get("/:id", getImage);
router.delete("/:id", protect, authorize("admin"), deleteImage);

export default router;

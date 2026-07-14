import { Router } from "express";
import { getDashboardStats } from "../controllers/adminController.js";
import { protect, authorize } from "../middleware/auth.js";

const router = Router();

router.get("/dashboard", protect, authorize("admin"), getDashboardStats);

export default router;

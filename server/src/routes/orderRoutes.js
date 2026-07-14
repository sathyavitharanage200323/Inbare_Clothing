import { Router } from "express";
import {
    createOrder,
    getMyOrders,
    getOrder,
    getAllOrders,
    updateOrderStatus,
    cancelOrder,
} from "../controllers/orderController.js";
import { protect, authorize } from "../middleware/auth.js";

const router = Router();

router.post("/", protect, createOrder);
router.get("/my-orders", protect, getMyOrders);
router.get("/", protect, authorize("admin"), getAllOrders);
router.get("/:id", protect, getOrder);
router.put("/:id/status", protect, authorize("admin"), updateOrderStatus);
router.put("/:id/cancel", protect, cancelOrder);

export default router;

import { Router } from "express";
import {
    getCart,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
} from "../controllers/cartController.js";
import { protect } from "../middleware/auth.js";

const router = Router();

router.get("/", protect, getCart);
router.post("/add", protect, addToCart);
router.put("/item/:productId/:size?/:color?", protect, updateCartItem);
router.delete("/item/:productId/:size?/:color?", protect, removeFromCart);
router.delete("/clear", protect, clearCart);

export default router;

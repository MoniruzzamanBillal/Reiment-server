import { Router } from "express";
import { cartController } from "./cart.controller";

const router = Router();

// ! for adding to cart
router.post("/add-to-cart", cartController.addToCart);

//
export const cartRouter = router;

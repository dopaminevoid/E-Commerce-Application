import e from "express";
import { authUser } from "../middlewares/authUser.js";
import {removeProductFromCart, addProductToCart, getCart} from "../controllers/cartController.js"


const router = e.Router();


router.post("/add-to-cart",authUser,addProductToCart)


router.delete("/remove-from-cart",authUser,removeProductFromCart)


router.get("/get-cart-details",authUser,getCart)


export { router as cartRouter };
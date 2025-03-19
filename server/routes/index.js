import e from "express"
import {userRoutes} from "./userRoutes.js";
import {productRouter} from "./productRoutes.js";
import {adminRoutes} from "./adminRoutes.js";
import { cartRouter } from "./cartRoutes.js";
import { reviewRouter } from "./reviewRoutes.js";
const router = e.Router()

router.use("/user", userRoutes)

router.use("/admin", adminRoutes)
router.use("/product", productRouter)
router.use("/cart", cartRouter)
router.use("/review", reviewRouter)



export {router as apiRouter}
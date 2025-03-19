import e from "express";

import { getAllProducts, productDetails, addProduct } from "../controllers/productController.js";
import { authUser } from "../middlewares/authUser.js";
import { authAdmin } from "../middlewares/authAdmin.js";
import { upload } from "../middlewares/multer.js";


const router = e.Router();


router.get("/productList", getAllProducts);
router.get("/productDetails/:productId", productDetails);
router.post("/addProduct",  upload.single("image"), addProduct)


export { router as productRouter }
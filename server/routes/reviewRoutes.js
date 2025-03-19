import e from "express";
import { authUser } from "../middlewares/authUser.js";
import { addReview, deleteReview, getAverageRating, getProductReviews } from "../controllers/reviewController.js"

const router = e.Router();


router.post("/addReivew",authUser,addReview)



router.delete("/deleteReview",authUser,deleteReview)

router.get('/productReviews',getProductReviews)

router.get("/averageRating",getAverageRating)




export { router as reviewRouter };
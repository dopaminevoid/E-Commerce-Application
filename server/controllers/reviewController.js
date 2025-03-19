import { Product } from "../models/productModel.js";
import { Review } from "../models/reviewModel.js";

export const addReview = async (req, res, next) => {
    try {
        const { productId, rating, comment } = req.body;
        const userId = req.user.id;

        
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

       
        if (rating > 5 || rating < 1) {
            return res.status(400).json({ message: "Please provide a proper rating" });
        }

        
        const review = await Review.findOneAndUpdate({ userId, courseId }, { rating, comment }, { new: true, upsert: true });

        

        res.status(201).json({ data: review, message: "Review addedd" });
    } catch (error) {
        

        res.status(500).json({ message: error.message || "Internal server error" });
    }
};

export const getProductReviews = async (req, res) => {
    try {
        const { productId } = req.params;

        const reviews = await Review.find({ productId }).populate("userId", "name").sort({ createdAt: -1 });

        if (!reviews.length) {
            return res.status(404).json({ message: "No reviews found for this course" });
        }

        res.status(200).json({ data: reviews, message: "Product reviews fetched" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};

export const deleteReview = async (req, res) => {
    try {
        const { reviewId } = req.params;
        const userId = req.user.id;

        const review = await Review.findOneAndDelete({ _id: reviewId, userId });

        if (!review) {
            return res.status(404).json({ message: "Review not found or not authorized" });
        }

        res.status(200).json({ message: "Review deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};

export const getAverageRating = async (req, res) => {
    try {
        const { productId } = req.params;

        const reviews = await Review.find({ productId });

        if (!reviews.length) {
            return res.status(404).json({ message: "No reviews found for this product" });
        }

        const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

        res.status(200).json({ data: averageRating, message: "Average rating fetched" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};
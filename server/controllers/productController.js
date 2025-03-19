import {Product} from "../models/productModel.js"
import {cloudinaryInstance} from "../config/cloudinary.js"
export const getAllProducts = async (req, res, next) => {
    try {
        const productList = await Product.find().select("-stock -numReviews");

        res.json({ data: productList, message: "user autherized" });
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || "Internal server" });
    }
};

export const productDetails = async (req, res, next) => {
    try {
        const { productId } = req.params;

        const productDetails = await Course.findById(productId).populate("brand");
       
        res.json({ data: productDetails, message: "user autherized" });
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || "Internal server" });
    }
};


export const addProduct = async (req, res, next) => {
    try {
        const { name, description, price, category, brand, image, stock } = req.body;

        const cloudinaryRes = await cloudinaryInstance.uploader.upload(req.file.path);


        const newProduct = new Product({
            name,
            description,
            price,
            category,
            brand,
            image:cloudinaryRes.url,
            stock
        });

       
        await newProduct.save();

        res.status(201).json({ data: newProduct, message: "Product added successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message || "Internal server error" });
    }
};


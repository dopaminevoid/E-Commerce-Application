import { Cart } from "../models/cartModel.js";

export const getCart = async (req, res) => {
    try {
        const userId = req.user.id;

        const cart = await Cart.findOne({ userId }).populate("product.productId");
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        res.status(200).json({ data: cart, message: "cart fetched" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};

export const addProductToCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId } = req.body;

        
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        
        let cart = await Cart.findOne({ userId });
        if (!cart) {
            cart = new Cart({ userId, products: [] });
        }

        
        const productExists = cart.products.some((item) => item.productId.equals(productId));
        if (productExists) {
            return res.status(400).json({ message: " Product already in the cart" });
        }

        
        cart.products.push({
            productId,
            price: product.price,
        });

        
        cart.calculateTotalPrice();

        await cart.save();

        res.status(200).json({ data: cart, message: "Product added to cart" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};

export const removeProductFromCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId } = req.body;

        
        let cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        
        cart.products = cart.products.filter((item) => !item.productId.equals(productId));

      
        cart.calculateTotalPrice();

       
        await cart.save();

        res.status(200).json({ data: cart, message: "Product removed from cart" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};
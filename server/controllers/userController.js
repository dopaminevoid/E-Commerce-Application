import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";
import {generateToken} from "../utils/token.js"

export const userSignup = async (req, res, next) => {
    try { 
        const { name, email, password, confirmPassword, mobile, profilePic } = req.body;

        if (!name || !email || !password || !confirmPassword || !mobile) {
            return res.status(400).json("All fields are required");
        }

        const userExist = await User.findOne({ email });

        if (userExist) {
            return res.status(400).json("User already exists");
        }

        if (password !== confirmPassword) {
            return res.status(400).json("Password not the same as confirm password");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ name, email, password: hashedPassword, mobile, profilePic });
        await newUser.save();

        const token = generateToken(newUser._id, "user");
        res.cookie('token', token);

        
        const userResponse = await User.findById(newUser._id).lean();
        delete userResponse.password;

        res.json({ data: userResponse, message: "Signup success" });

    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || "Internal Server Error" });
    }
};

export const    userSignin = async(req,res,next) =>{
    try { 
        const {email,password} = req.body
        if(!email||!password ){
            return res.status(400).json("All fields are required")
        }
        const userExist = await User.findOne({email})
            if(!userExist){
                return res.status(400).json("User does not exist")
            }
            const passwordMatch = bcrypt.compareSync(password, userExist.password)
            if (!passwordMatch){
            return res.status(401).json({message: "Invalid credentials. Do you want to reset the password",
                "resetOption": true})
        }
        const token = generateToken(userExist._id,"user")
            res.cookie('token', token)
            
            if(!userExist.isActive){
                return res.status(401).json("User is not active")
            }
            delete userExist._doc.password
            res.json({data: userExist, message:"Login Success"})
        
    } catch (error) {
        res.status(error.statuscode || 500).json({message:error.message || "Internal Server"})
        
    }    
}
export const userProfile = async (req, res, next) => {
    try {
        
        const userId = req.user.id;
        const userData = await User.findById(userId).select("-password");

        res.json({ data: userData, message: "user profile fetched" });
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || "Internal server" });
    }
};

export const userProfileUpdate = async (req, res, next) => {
    try {
        const { name, email, password, confirmPassword, mobile, profilePic } = req.body;

      
        const userId = req.user.id;
        const userData = await User.findByIdAndUpdate(
            userId,
            { name, email, password, confirmPassword, mobile, profilePic },
            { new: true }
        );

        res.json({ data: userData, message: "user profile fetched" });
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || "Internal server" });
    }
};


export const userLogout = async (req, res, next) => {
    try {
        res.clearCookie("token");

        res.json({  message: "user logout success" });
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || "Internal server" })
    }
}

export const checkUser = async (req, res, next) => {
    try {

        res.json({  message: "user autherized" });
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || "Internal server" });
    }
}

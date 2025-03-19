import { Admin } from "../models/adminModel.js";
import bcrypt from "bcrypt";
import {generateToken} from "../utils/token.js"

export const    adminSignup = async(req,res,next) =>{
    try { 
        
        

            const {name,email,password,confirmPassword,mobile,profilePic} = req.body
            if(!name||!email||!password||!confirmPassword||!mobile){
                return res.status(400).json("All fields are required")
            }
            
            console.log(name,email);
            
            const adminExist = await User.findOne({email})
            if(adminExist){
                return res.status(400).json("Admin already exists")
            }
            if(password !== confirmPassword){
                return res.status(400).json("Password not the same as confirm password")
            }
            const hashedPassword = await bcrypt.hash(password, 10);

            const newAdmin = new Admin({name,email,password:hashedPassword,mobile,profilePic})
            await newAdmin.save()
            
            
            const token = generateToken(newAdmin._id,"admin")
            res.cookie('token', token)
            res.json({data: newAdmin, message:"signup success"})

    } catch (error) {
        console.log(error);
        
    }
}
export const    adminSignin = async(req,res,next) =>{
    try { 
        const {email,password,confirmPassword} = req.body
        if(!email||!password||!confirmPassword  ){
            return res.status(400).json("All fields are required")
        }
        const adminExist = await User.findOne({email})
            if(!adminExist){
                return res.status(400).json("User does not exist")
            }
            const passwordMatch = bcrypt.compareSync(password, adminExist.password)
            if (!passwordMatch){
            return res.status(401).json("Invalid credentials")
        }
        const token = generateToken(adminExist._id,"user")
            res.cookie('token', token)
            res.json({data: adminExist, message:"Signed in successfully"})
            if(!adminExist.isActive){
                return res.status(401).json("User is not active")
            }

           
    } catch (error) {
        console.log(error);
        
    }
}
export const adminProfile = async (req,res,next) =>{
    try {
        const userId ="asdgafas"
        const userData = await User.findById()
        res.json({data: userData, message:"User profile fetched"})
    } catch (error) {
        res.status(error.statuscode || 500).json({message:error.message || "Internal Server"})
    }
}

export const adminProfileUpdate = async (req, res, next) => {
    try {
        const { name, email, password, confirmPassword, mobile, profilePic } = req.body;

        
        const userId = req.user.id;
        const userData = await User.findByIdAndUpdate(
            userId,
            { name, email, password, confirmPassword, mobile, profilePic },
            { new: true }
        );

        res.json({ data: userData, message: "User profile fetched" })
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || "Internal server" })
    }
}

export const adminLogout = async (req, res, next) => {
    try {
        res.clearCookie("token");

        res.json({  message: "user logout success" });
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || "Internal server" })
    }
}

export const checkAdmin = async (req, res, next) => {
    try {

        res.json({  message: "user autherized" });
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || "Internal server" });
    }
}

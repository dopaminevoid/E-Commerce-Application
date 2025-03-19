import jwt from "jsonwebtoken";

export const authAdmin = (req, res, next) => {
    try {
        console.log("Received Cookies:", req.cookies); 
        const { token } = req.cookies;

        if (!token) {
            console.log("No token found in cookies!"); 
            return res.status(401).json({ message: "User not authorized" });
        }

      
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        console.log("Decoded Token:", decodedToken);

        if (!decodedToken) {
            console.log("Token verification failed!");
            return res.status(401).json({ message: "User not authorized" });
        }

      
        if (!decodedToken.isAdmin) {
            console.log("User is not an admin!");
            return res.status(403).json({ message: "Access denied, admin only" });
        }

        req.user = decodedToken;
        next();
    } catch (error) {
        console.log("JWT Error:", error.message); // Log specific error
        res.status(500).json({ message: error.message || "Internal server error" });
    }
};

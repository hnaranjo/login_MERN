import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from "../config.js";

export const authRequired = (req, res, next) => {
try {
    const { token } = req.cookies;
    
    if(!token) res.status(401).json({ message: "No token, authorization denied"});

    jwt.verify(token, TOKEN_SECRET, (err, user) => {
        if (err) return res.status(401).json({ message: "Ivanlid token" });
        
        req.user = user;
        
        next();
    });
    
} catch (error) {
    return res.status(500).json({ message: error.message });
}
}
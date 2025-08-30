import jwt from "jsonwebtoken";

function authenticateToken(req, res, next){
    try{
        const token = req.cookies?.accessToken;
        if(!token){
            return res.status(401).json({error: "unauthorized"});
        }
        const data = jwt.verify(token, process.env.JWT_SECRET);
        req.user = {userId: data.subject, email: data.email || null};
        next();
    }
    catch{
        return res.status(401).json({ error: "Unauthenticated" });
    }
}

export {authenticateToken}
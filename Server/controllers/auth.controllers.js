import User from "../models/user.models.js";
import RefreshToken from "../models/refreshTokens.models.js";
import { v4 } from "uuid";
import {
  signAccessToken,
  signRefreshToken,
  setAccessCookie,
  setRefreshCookie,
  clearAuthCookies,
  verifyToken
} from "../utils/tokens.utils.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


// Authenticate user: /api/auth/me
async function authenticateMe(req, res){
    try{
        const token = req.cookies?.token;
        if(!token){
            return res.status(401).json({error: "unauthenticated"});
        }
        
        const data = verifyToken(token);
         
        if(!data){
            return res.status(401).json({error: "unauthenticated"});
        }
        const user = await User.findById({_id: data.subject}).select("_id username email")
        if (!user){
            return res.status(401).json({error: "unauthenticated"});
        }
        console.log("User authenticated successfully");
        return res.status(200).json({user, message: "User authenticated successfully"});
    }
    catch(err){
        return res.status(500).json({error: "Internal server error"});
    }
}


// Login user: /api/auth/login
async function loginUser(req, res) {

    // validate input
    const { email, password } = req.body;
    if(!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
    }
    try {
        // check if user exists
        const user = await User.findOne({ email:email });

        // user not found
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid credentials" });
        }
        
        // generate unique identifier for refresh token
        const jti = v4();

        // generate tokens
        const accessToken = signAccessToken(user);
        const refreshToken = signRefreshToken(user, jti);

        // store RT in DB
        const rt = new RefreshToken({ userId: user._id, jti, revoked: false });
        await rt.save();
        
        // set tokens in cookies
        setAccessCookie(res, accessToken);
        setRefreshCookie(res, refreshToken);

        // send response
        return res.status(200).json({
            message: "Login successful",
            user: { id: user._id, username: user.username, email: user.email },
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}


// Logout user: /api/auth/logout
async function logoutUser(req, res) {
    const token = req.cookies?.refreshToken;
    if(!token){
        return res.status(401).json({error: "unauthenticated"});
    }
    const data = verifyToken(token);
    console.log(data);

    // mark all refresh token as revoked
    try{
        await RefreshToken.updateMany({ jti: data.jti }, { revoked: true });
        // clear cookies
        clearAuthCookies(res);
        console.log("jti - ", data.jti);
        return res.status(201).json({ message: "Logout successful" });
    }catch(err){
        return res.status(500).json({error: "Internal server error"});
    }
}


// Refresh access token: /api/auth/refresh
async function refreshAccessToken(req, res) {
    const rt = req.cookies?.refreshToken;
    if(!rt){
        return res.status(401).json({error: "Refresh token not found"});
    }
    const data = jwt.verify(rt, process.env.JWT_SECRET);
    console.log("error?", data);
    try{
        const userId = data.subject;
        const jti = data.jti;

        const record = await RefreshToken.findOne({userId, jti})
        if(!record){
            return res.status(401).json({error:"invalid"})
        }
        record.revoked = true;

        const newJti = v4();
        record.replaceBy = newJti;
        await record.save();
        console.log("record - ", record);
        const user = await User.findById(userId);
        if(!user){
            return res.status(401).json({error: "unauthenticated"});
        }
        // generate tokens
        const newAccessToken = signAccessToken(user);
        const newRefreshToken = signRefreshToken(user, jti);

        // store RT in DB
        const rt = new RefreshToken({ userId: user._id, jti, revoked: false });
        await rt.save();
        
        // set tokens in cookies
        setAccessCookie(res, newAccessToken);
        setRefreshCookie(res, newRefreshToken);

        // send response
        return res.status(200).json({
            user: { id: user._id, username: user.username, email: user.email, token: newAccessToken },
        });
    
    }
    catch(err){
        return res.status(509).json({error: "Internal server error"});
    }
}


export { loginUser, logoutUser, refreshAccessToken, authenticateMe };
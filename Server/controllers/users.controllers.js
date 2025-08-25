import jwt from "jsonwebtoken";
import User from '../models/user.model.js';
import RefreshToken from "../models/refreshTokens.models.js";
import {v4} from 'uuid';
import bcrypt from "bcrypt";

// set auth token in cookies
function setJWTToken(res, email) {
    const token = jwt.sign({ email}, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.cookie("token", token, { 
        httpOnly: true, 
        sameSite: "strict", 
        maxAge: 7 * 24 * 60 * 60 * 1000
    });
}


// add RT to DB and set in cookies
async function setRefreshToken(res, user, uid) {
    const rt = new RefreshToken({ userId: user, jti: uid,revoked: false });
    await rt.save();
    const token = jwt.sign({ jti: uid, userId: user.email, }, process.env.JWT_SECRET, { expiresIn: '14d' });
    res.cookie("refreshToken", token, { 
        httpOnly: true, 
        sameSite: "strict", 
        maxAge: 2* 7 * 24 * 60 * 60 * 1000
    });
    console.log(token);
}

//----------------------- CONTROLLERS-----------------------

// create user in DB and log in
async function createUser(req, res) {
    const { username, email, password } = req.body;
    try {
        const user = new User({ username, email, password});
        await user.save();
        console.log("User created successfully");
        const uid = v4(10);
        setJWTToken(res, email);
        await setRefreshToken(res, user, uid);
        return res.status(200).json({ message: "User created successfully" });
    } catch (error) {
        res.status(400).json({ error: error.message });
        
    }
}

// login user, set auth token and RT
async function loginUser(req, res) {
    console.log("in loginUser function")
    const { email, password } = req.body;
    console.log(`email - ${email}\npassword - ${password} `)
    if(!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
    }
    try {
        const user = await User.findOne({ email:email });
        console.log(user);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid credentials" });
        }
        const uid = v4(10);

        setJWTToken(res, email);
        await setRefreshToken(res, user, uid);
        console.log("User logged in successfully");
        return res.status(200).json({ message: "Login successful" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export { createUser, loginUser };
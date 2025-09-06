import User from '../models/user.models.js';
import RefreshToken from "../models/refreshTokens.models.js";
import {v4} from 'uuid';
import {  
    signAccessToken,
    signRefreshToken,
    setAccessCookie,
    setRefreshCookie,
} from "../utils/tokens.utils.js";   

// create user in DB and log in
async function createUser(req, res) {
    const { username, email, password } = req.body;
    try {
        const user = new User({ username, email, password});
        await user.save();
        console.log("User created successfully");
        const jti = v4();
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
            user: { id: user._id, username: user.username, email: user.email },
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
        
    }
}



export { createUser };
import jwt from "jsonwebtoken";

const isProductionEnv = process.env.NODE_ENV === 'production';

function signAccessToken(user) {
    const accessToken = jwt.sign(
        { 
            subject: user._id,
            email: user.email
        }, 
        process.env.JWT_SECRET, 
        { expiresIn: '1h' }
    );
    return accessToken;
}

function signRefreshToken(user, jti){
    const refreshToken = jwt.sign(
        {
            subject: user._id,
            jti
        }, 
        process.env.JWT_SECRET, 
        {expiresIn: '14d'}
    );
    return refreshToken;
}
function verifyToken(token) {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded;
    } catch (error) {
        return null;
    }
}

function baseCookie() {
  return {
    httpOnly: true,
    secure: isProductionEnv,   
    sameSite: isProductionEnv ? "none" : "lax", 
    path: "/",
  };
}

function setAccessCookie(res, token){
    res.cookie("accessToken", token, {
    ...baseCookie(),
    maxAge: 60 * 60 * 1000,
  });
}

function setRefreshCookie(res, token){    
    res.cookie("refreshToken", token, {
    ...baseCookie(),
    maxAge: 14* 24* 60 * 60 * 1000,
  });
}

function clearAuthCookies(res) {
  res.clearCookie("accessToken", { ...baseCookie(), maxAge: 0 });
  res.clearCookie("refreshToken", { ...baseCookie(), maxAge: 0 });
}


export {signAccessToken, signRefreshToken, setAccessCookie, setRefreshCookie, clearAuthCookies, verifyToken}
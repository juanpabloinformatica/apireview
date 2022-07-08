
import jwt from 'jsonwebtoken';

export const generateAccessToken = (userId)=>{
    try {
        const expireIn = 60*60;
        const accessToken = jwt.sign({uid:userId},process.env.JWT_SECRET,{
            expiresIn:expireIn
        })
        console.log(accessToken);
        return {accessToken,expireIn};
    } catch (error) {
        console.log(error);
    }
}
export const generateRefreshToken = (userId,res)=>{
    try {
        const expireIn = 60*60*24*30;
        const refreshToken = jwt.sign({uid:userId},process.env.JWT_REFRESH,{
            expiresIn:expireIn
        })
        res.cookie('refreshToken',refreshToken,{
            httpOnly:true,
            maxAge:expireIn*1000
        })
        console.log(refreshToken);
    } catch (error) {
        console.log(error);
    }
}


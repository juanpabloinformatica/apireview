import jwt from 'jsonwebtoken';

export const validateAccessToken = async(req,res,next)=>{
    try {
        let token = req.headers.authorization;
        if(!token){
            throw new Error('token no existe. ');
        }
        token = token.split(' ')[1];
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.uid = decoded.uid;
        next();
    } catch (error) {
        console.log(error)
    }
}
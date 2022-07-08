import User from '../models/userSchema.js';
import jwt from 'jsonwebtoken';
import {generateAccessToken,generateRefreshToken} from '../utils/tokenCreation.js';

export const register = async (req,res)=>{
    const {email,password} = req.body;
    console.log('aqui2')
    try {
        if(await User.findOne({email})){
            throw new Error('email anteriormente registrado');
        }
        const user = new User({email,password});
        await user.save();
        return res.json({message:'Usuario registrado'});
    } catch (error) {
        return res.json({errors:error.message});
    }
}
export const login = async(req,res)=>{
    const {email,password} = req.body;
    try {
        if(!await User.findOne({email})){
            throw new Error('no existe e-mail en la base de datos.')
        } 
        const user = await User.findOne({email});
        if(await user.validatePassword(password)==false){
            throw new Error('Contrasegna incorrecta.');
        }  
        const {accessToken,expireIn} = generateAccessToken(user._id); 
        generateRefreshToken(user._id,res);
        return res.json({accessToken,expireIn});

    } catch (error) {
        return res.json({error:error.message});

    }
}
export const refreshToken = async (req,res)=>{
    try {
        const refreshToken = req.cookies.refreshToken;
        const decoded = jwt.verify(refreshToken,process.env.JWT_REFRESH);
        const {accessToken,expireIn} = generateAccessToken(decoded.uid);
        return res.json({accessToken,expireIn} );
    } catch (error) {
        console.log(error);
    }
}
export const  infoUser = async(req,res)=>{
    try {
        const user = await User.findById(req.uid).lean();
        if(!user){
            throw new Error('El usuario no existe. ');
        }
        return res.json({email:user.email,password:user.password});
    } catch (error) {
        return res.json(error);
    }
}
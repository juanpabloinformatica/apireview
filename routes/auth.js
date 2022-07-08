import { Router } from "express";
import { infoUser, login, refreshToken, register } from "../controllers/authController.js";
import {body} from 'express-validator'; 
import { registerValidator } from "../middlewares/registerValidator.js";
import { validateAccessToken } from "../middlewares/tokenValidator.js";
const router = Router();


router.post('/register',[
    body('email')
    .isEmail(),
    body('password')
    .isLength({min:5})
    .custom((value, { req })=>{
        if(value===req.body.repitPassword){
            return true
        }else{
            throw new Error('contrasegnas son diferentes');
        }
    })
],registerValidator,register);
router.post('/login',login);
router.get('/refresh',refreshToken);
router.get('/protected',validateAccessToken,infoUser);
export default router;
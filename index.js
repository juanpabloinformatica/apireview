import 'dotenv/config';
import './database/database.js';
import './models/userSchema.js';

import express from 'express';
import authRouter from './routes/auth.js';
import cookieParser from 'cookie-parser';
const app = express();

app.use(express.json());
app.use(cookieParser());
// app.use();




app.use(express.static('./public'));


app.use('/api/v1/auth',authRouter);



const PORT = 5500;
app.listen(PORT , ()=>{
    console.log('Working');
})

//jsdjcbabcbabcbqbbqvib;q   'hvo    h'v'h   v   'v'hoevoh'qeohv;qevohvqeoihe
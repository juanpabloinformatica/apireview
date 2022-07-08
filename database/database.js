import mongoose from 'mongoose';

const getConnected = async()=>{
    try {
        await mongoose.connect(process.env.URI);
        console.log('Conectado a la base de datos');
    } catch (error) {
        console.log('error');
    }
}

getConnected();




import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.routes.js'
import authRouter from './routes/auth.route.js';
import cookieParser from 'cookie-parser';
import listingRouter from './routes/listing.route.js'
dotenv.config();

mongoose.connect(process.env.MONGO).then(() =>{
    console.log('conneted to database!');

}).catch((err) => {
    console.log('connection failed');
})
const app = express();

// allow to use json from insomnia databse

app.use(express.json());

app.use(cookieParser());

app.listen(3000,() => {
    console.log('Server is running on port 3000!')
});

app.use("/api/user" , userRouter);
app.use('/api/auth', authRouter);
app.use('/api/listing', listingRouter);


// craeting middleware

app.use((err, req, res, next) => {
const statusCode = err.ststusCode || 500;
const message = err.message || 'internal server error';
return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    });
});
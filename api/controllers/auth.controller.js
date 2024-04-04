import User from '../models/user.model.js';
import bcrptjs from 'bcryptjs'
import { errorHandler } from '../utils/error.js';

export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;
    const hashedPassword = bcrptjs.hashSync(password, 10);
    const newUser = new User ({username, email, password: hashedPassword });
    try{

        await newUser.save();
        res.status(201).json('user created successfully');
    } catch(error) {
        // res.status(404).json(error.message); //gives error as duplicate key to user 
        next(error);
    }

};

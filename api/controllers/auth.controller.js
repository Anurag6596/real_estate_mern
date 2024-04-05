import User from '../models/user.model.js';
import bcrptjs from 'bcryptjs'
import { errorHandler } from '../utils/error.js';
import jwt  from "jsonwebtoken";

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

export const signin = async (req, res, next) =>{
    const {email, password} = req.body;
    try {
        const validUser = await  User.findOne({email});
        if(!validUser) return next(errorHandler(404,'User not found..☠️'));
        const validPassword = bcrptjs.compareSync(password, validUser.password );// comparing  the entered password with the stored one in db
        if (!validPassword) return  next(errorHandler(505,'Wrong credentials'));  //if password is not valid then returns error to user as wronf credentials

        // creating web tokens or we can say cookies 

        const token = jwt.sign({_id : validUser._id}, process.env.JWT_SECRET)
        //when ew create a token it should not send password its not good practice so we will hide it using below
        const { password: pass, ...rest} = validUser._doc; // this distructs the passwords 
        res.cookie('access_token', token, {httpOnly: true})
        .status(200).
        json(rest) //created the cookie  in browser using this access_token

    } catch (error) {
        next(error);
    }
}

export const google = async (req, res, next)  => {
    try {
        const user = await User.findOne({email: req.body.email})
        if(user){
            const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
            const  { password: pass, ...rest}= user._doc;
            res
               .cookie('access_token', token, { httpOnly: true })
               .status(200)
               .json(rest);
        }else{
            const generatedPassword = Math.random().toString(36).slice(-8) +  Math.random().toString(36).slice(-8); // auto generating password for google sign in
            const hashedPassword = bcrptjs.hashSync(generatedPassword,10);
            const newUser = new User({username: req.body.name.split(" ").join("").toLowerCase() + 
            Math.random().toString(36).slice(-4), email: req.body.email, password: req.body.password, avatar: req.body.photo});
            await newUser.save();
            const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET);
            const { password: pass, ...rest } = newUser._doc;
            res.cookie('access_token', token , {httpOnly:true}).status(201).json(rest)
        }

        
    } catch (error) {
        next(error)
    }
}
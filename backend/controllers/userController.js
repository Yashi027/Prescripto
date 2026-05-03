import validator from 'validator';
import bcrypt from 'bcrypt';
import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';

const registerUser = async (req,res) => {
    try {
        const {name, email, password} = req.body
        if(!name || !email || !password){
            return res.json({success:false, message:"Missing Credentials"})
        }
        if(password.length < 6){
            return res.json({success:false, message:"Enter strong password"})
        }
        if(!validator.isEmail(email)){
            return res.json({success:false, message:"Enter valid email"})
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const userData = {
            name,
            email,
            password:hashedPassword
        }
        const newUser = new User(userData)
        const user = await newUser.save()
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET)
        return res.json({success: true, token})
    } catch (error) {
        console.log(error)
        res.json({success: false,message: error.message})
    }
}

const loginUser = async (req,res) => {
    try {
        const {email,password} = req.body
        const user = await User.findOne({email})
        if(!user){
            return res.json({success:false, message: "User does not exists"});
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if(isMatch){
            const token = jwt.sign({id:user._id}, process.env.JWT_SECRET)
            return res.json({success:true, token})
        }else{
            return res.json({success:false, message:"Invalid Credentials"})
        }
    } catch (error) {
        console.log(error)
        res.json({success: false,message: error.message})
    }
}


export {registerUser, loginUser}
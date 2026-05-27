import validator from 'validator';
import bcrypt from 'bcrypt';
import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import {v2 as cloudinary} from 'cloudinary';
import Doctor from '../models/doctorModel.js';
import Appointment from '../models/appointmentModel.js';

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

const getProfile = async (req,res) => {
    try {
        const userData = await User.findById(req.userId).select('-password')
        res.json({success: true, userData})
    } catch (error) {
        console.log(error)
        res.json({success: false,message: error.message})
    }
}

const updateProfile = async (req,res) => {
    try {
        const {name, phone, address, dob, gender} = req.body
        const imageFile = req.file

        if(!name || !phone || !address || !dob || !gender){
            return res.json({success:false, message:"Data missing"})
        }

        await User.findByIdAndUpdate(req.userId,{name,phone,address:JSON.parse(address),dob,gender})
        if(imageFile){
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, {resource_type:'image'})
            const imageURL = imageUpload.secure_url
            await User.findByIdAndUpdate(req.userId,{image:imageURL})
        }
        res.json({success:true, message:"Profile Updated"})
    } catch (error) {
        console.log(error)
        res.json({success: false,message: error.message})
    }
}

const bookAppointment = async (req,res) => {
    try {
        const userId = req.userId
        const { docId, slotDate, slotTime} = req.body

        const docData = await Doctor.findById(docId).select('-password')
        if(!docData.available){
            return res.json({success:false, message:"Doctor Not available"})
        }
        let slots_booked = docData.slots_booked
        if(slots_booked[slotDate]){
            if(slots_booked[slotDate].includes(slotTime)){
                return res.json({success:false, message:"Slot Not available"})
            }else{
                slots_booked[slotDate].push(slotTime)
            }
        }else{
            slots_booked[slotDate] = []
            slots_booked[slotDate].push(slotTime)
        }

        const userData = await User.findById(userId).select('-password')
        delete docData.slots_booked
        const appointmentData = {
            userId,
            docId,
            userData,
            docData,
            amount:docData.fees,
            slotTime,
            slotDate,
            date:Date.now()
        }

        const newAppointment = new Appointment(appointmentData)
        await newAppointment.save()
        await Doctor.findByIdAndUpdate(docId,{slots_booked})
        res.json({success:true, message:'Appointment Booked'})
    } catch (error) {
        console.log(error)
        res.json({success: false,message: error.message})
    }
}
export {registerUser, loginUser, getProfile, updateProfile, bookAppointment}
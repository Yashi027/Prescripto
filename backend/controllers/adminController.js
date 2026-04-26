import validator from 'validator';
import bcrypt from 'bcrypt';
import {v2 as cloudinary } from 'cloudinary';
import Doctor from '../models/doctorModel.js';

const addDoctor = async (req,res) => {
    try {
        const {name, email, password, speciality, degree, experience, about, fees, address} = req.body;
        const imageFile = req.file;

        if(!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address){
            return res.json({success: false, message: 'Credentials are missing'})
        }

        if(!validator.isEmail(email)){
            return res.json({success: false, message: 'Please Enter valid Email'})
        }
        if(password.length < 6){
            return res.json({success: false, message: 'Please Enter Strong Password'})
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        const imageUpload = await cloudinary.uploader.upload(imageFile.path, {resource_type:"image"})
        const imageUrl = imageUpload.secure_url

        const doctorData = {
            name,
            email,
            image: imageUrl,
            password: hashedPassword,
            speciality,
            degree,
            experience,
            fees,
            address: JSON.parse(address),
            about,
            date: Date.now()
        }

        const newDoctor = new Doctor(doctorData)
        await newDoctor.save()

        res.json({success: true, message: "Doctor added successfully"})

    } catch (error) {
        console.log(error)
        res.json({success: false,message: error.message})
    }
}


export {addDoctor}
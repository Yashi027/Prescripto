import Doctor from "../models/doctorModel.js"
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const changeAvailability = async (req, res) => {
    try {
        const { docId } = req.body
        const docData = await Doctor.findById(docId)
        await Doctor.findByIdAndUpdate(docId, { available: !docData.available })
        return res.json({ success: true, message: "Availability changed" })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

const doctorList = async (req, res) => {
    try {
        const doctors = await Doctor.find({}).select(['-email', '-password'])
        return res.json({ success: true, doctors })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

const loginDoctor = async (req, res) => {
    try {
        const { email, password } = req.body
        const doctor = await Doctor.findOne({ email })

        if (!doctor) {
            return res.json({ success: false, message: "Invalid Credentials" })
        }

        const isMatch = await bcrypt.compare(password, doctor.password)

        if (!isMatch) {
            return res.json({ success: false, message: "Invalid Password" })
        } else {
            const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET)
            return res.json({ success: true, token })
        }
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export { changeAvailability, doctorList, loginDoctor }
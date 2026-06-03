import Doctor from "../models/doctorModel.js"
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Appointment from "../models/appointmentModel.js";

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

const appointmentsDoctor = async (req, res) => {
    try {
        const docId = req.docId;
        const appointments = await Appointment.find({ docId })
        return res.json({ success: true, appointments })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

const appointmentComplete = async (req, res) => {
    try {
        const docId = req.docId;
        const { appointmentId } = req.body
        const appointmentData = await Appointment.findById(appointmentId)
        if (appointmentData && appointmentData.docId === docId) {
            await Appointment.findByIdAndUpdate(appointmentId, { isCompleted: true });
            return res.json({ success: true, message: 'Appointment Completed' })
        } else {
            return res.json({ success: false, message: "Failed" })
        }
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

const appointmentCancel = async (req, res) => {
    try {
        const docId = req.docId;
        const { appointmentId } = req.body
        const appointmentData = await Appointment.findById(appointmentId)
        if (appointmentData && appointmentData.docId === docId) {
            await Appointment.findByIdAndUpdate(appointmentId, { cancelled: true });
            return res.json({ success: true, message: 'Appointment cancelled' })
        } else {
            return res.json({ success: false, message: "Cancellation Failed" })
        }
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

const doctorDashboard = async (req, res) => {
    try {
        const docId = req.docId;
        const appointments = await Appointment.find({ docId });
        let earning = 0;
        appointments.map((item) => {
            if (item.isCompleted || item.payment) {
                earning += item.amount
            }
        })
        let patients = []
        appointments.map((item) => {
            if (!patients.includes(item.userId)) {
                patients.push(item.userId)
            }
        })

        const dashData = {
            earning,
            appointments: appointments.length,
            patients: patients.length,
            latestAppointments: appointments.reverse().slice(0, 5)
        }
        return res.json({ success: true, dashData })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

const doctorProfile = async (req, res) => {
    try {
        const docId = req.docId;
        const profileData = await Doctor.findById(docId).select('-password')

        return res.json({ success: true, profileData })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

const updateDoctorProfile = async (req, res) => {
    try {
        const docId = req.docId;
        const { fees, address, available } = req.body;

        await Doctor.findByIdAndUpdate(docId, { fees, address, available })

        return res.json({ success: true, message: "Profile Updated" })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}
export { changeAvailability, doctorList, loginDoctor, appointmentsDoctor, appointmentComplete, appointmentCancel, doctorDashboard, doctorProfile, updateDoctorProfile }
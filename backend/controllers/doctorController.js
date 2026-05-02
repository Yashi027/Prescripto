import Doctor from "../models/doctorModel.js"


const changeAvailability = async (req,res) => {
    try {
        const {docId} = req.body
        const docData = await Doctor.findById(docId)
        await Doctor.findByIdAndUpdate(docId, {available: !docData.available})
        return res.json({success:true, message:"Availability changed"})
    } catch (error) {
        console.log(error)
        res.json({success: false,message: error.message})
    }
}

const doctorList = async (req,res) => {
    try {
        const doctors = await Doctor.find({}).select(['-email','-password'])
        return  res.json({success:true, doctors})
    } catch (error) {
        console.log(error)
        res.json({success: false,message: error.message})
    }
}

export {changeAvailability, doctorList}
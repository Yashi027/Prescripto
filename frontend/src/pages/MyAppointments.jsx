import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from 'axios';

const MyAppointments = () => {
  const { backendUrl, token } = useContext(AppContext);

  const [appointments, setAppointments] = useState([])

  const months = ["","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split('_')
    return dateArray[0]+" "+months[Number(dateArray[1])]+" "+ dateArray[2];
  }

  const getUserAppointments = async (req,res) => {
    try {
      const {data} = await axios.get(backendUrl+'/api/user/appointments',{headers:{token}})
      if(data.success){
        setAppointments(data.appointments.reverse())
        console.log(appointments)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if(token){
      getUserAppointments()
    }
  },[token])

  return (
    <div className="px-4 sm:px-8 md:px-14 lg:px-24 py-8 min-h-screen bg-gray-50">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">My Appointments</h1>
        <p className="text-gray-500 mt-1">
          View and manage your booked appointments
        </p>
      </div>

      <div className="space-y-6">
        {appointments.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md border border-gray-100 p-5 hover:shadow-lg transition duration-300"
          >
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
              <div className="w-28 h-28 rounded-xl overflow-hidden bg-blue-50 shrink-0">
                <img
                  src={item.docData.image}
                  alt={item.docData.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1">
                <h2 className="text-xl font-semibold text-gray-800">
                  {item.docData.name}
                </h2>
                <p className="text-blue-600 font-medium mt-1">
                  {item.docData.speciality}
                </p>

                <div className="mt-3 text-sm text-gray-600 space-y-1">
                  <p className="font-medium text-gray-700">Address:</p>
                  <p>{item.docData.address.line1}</p>
                  <p>{item.docData.address.line2}</p>
                </div>

                <p className="mt-4 text-sm text-gray-700">
                  <span className="font-semibold">Date & Time:</span>{" "}
                  {slotDateFormat(item.slotDate)} | {item.slotTime}
                </p>
              </div>

              <div className="flex flex-col gap-3 w-full md:w-48">
                <button className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 transition">
                  Pay Online
                </button>

                <button className="w-full border border-red-500 text-red-500 py-2.5 rounded-lg font-medium hover:bg-red-50 transition">
                  Cancel Appointment
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointments;
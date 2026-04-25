import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

const MyAppointments = () => {
  const { doctors } = useContext(AppContext);

  return (
    <div className="px-4 sm:px-8 md:px-14 lg:px-24 py-8 min-h-screen bg-gray-50">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">My Appointments</h1>
        <p className="text-gray-500 mt-1">
          View and manage your booked appointments
        </p>
      </div>

      <div className="space-y-6">
        {doctors.slice(0, 2).map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md border border-gray-100 p-5 hover:shadow-lg transition duration-300"
          >
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
              <div className="w-28 h-28 rounded-xl overflow-hidden bg-blue-50 shrink-0">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1">
                <h2 className="text-xl font-semibold text-gray-800">
                  {item.name}
                </h2>
                <p className="text-blue-600 font-medium mt-1">
                  {item.speciality}
                </p>

                <div className="mt-3 text-sm text-gray-600 space-y-1">
                  <p className="font-medium text-gray-700">Address:</p>
                  <p>{item.address.line1}</p>
                  <p>{item.address.line2}</p>
                </div>

                <p className="mt-4 text-sm text-gray-700">
                  <span className="font-semibold">Date & Time:</span>{" "}
                  27 April, 2026 | 11:00 AM
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
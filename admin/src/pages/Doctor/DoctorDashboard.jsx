import React, { useContext, useEffect } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { assets } from '../../assets/assets';
import { AppContext } from '../../context/AppContext';

const DoctorDashboard = () => {

  const { dToken, dashData, setDashData, getDashData, cancelAppointment, completeAppointment } = useContext(DoctorContext)
  const { currency, slotDateFormat } = useContext(AppContext)

  useEffect(() => {
    if (dToken) {
      getDashData()
    }
  }, [dToken])

  return dashData && (
    <div className='m-5'>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Doctor Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 flex items-center gap-4 border border-gray-100">
          <div className="bg-blue-100 p-3 rounded-full">
            <img
              src={assets.earning_icon}
              alt="Earning"
              className="w-10 h-10"
            />
          </div>

          <div>
            <p className="text-3xl font-bold text-gray-800">
              {currency} {dashData.earning}
            </p>
            <p className="text-gray-500 font-medium">
              Earnings
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 flex items-center gap-4 border border-gray-100">
          <div className="bg-green-100 p-3 rounded-full">
            <img
              src={assets.appointments_icon}
              alt="Appointments"
              className="w-10 h-10"
            />
          </div>

          <div>
            <p className="text-3xl font-bold text-gray-800">
              {dashData.appointments}
            </p>
            <p className="text-gray-500 font-medium">
              Appointments
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 flex items-center gap-4 border border-gray-100">
          <div className="bg-purple-100 p-3 rounded-full">
            <img
              src={assets.patients_icon}
              alt="Patients"
              className="w-10 h-10"
            />
          </div>

          <div>
            <p className="text-3xl font-bold text-gray-800">
              {dashData.patients}
            </p>
            <p className="text-gray-500 font-medium">
              Patients
            </p>
          </div>
        </div>

      </div>

      <div className="mt-8 bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">

        <div className="flex items-center gap-3 px-4 sm:px-6 py-4 border-b bg-gray-50">
          <img
            src={assets.list_icon}
            alt=""
            className="w-5 h-5 sm:w-6 sm:h-6"
          />
          <p className="text-base sm:text-lg font-semibold text-gray-800">
            Latest Appointments
          </p>
        </div>

        <div>
          {dashData.latestAppointments.map((item, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-4 sm:px-6 py-4 border-b last:border-b-0 hover:bg-gray-50 transition"
            >
              <div className="flex items-center gap-3 sm:gap-4">
                <img
                  src={item.userData.image}
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover border"
                />

                <div>
                  <p className="font-semibold text-gray-800 text-sm sm:text-base">
                    {item.userData.name}
                  </p>

                  <p className="text-xs sm:text-sm text-gray-500">
                    {slotDateFormat(item.slotDate)}
                  </p>
                </div>
              </div>

              <div className="self-start sm:self-center">
                {
                    item.cancelled
                      ? <p className='text-red-500 p-4 rounded-xl'>Cancelled</p>
                      : item.isCompleted
                        ? <p className='text-green-500 p-4 rounded-xl'>Completed</p>
                        : <div className='flex flex-row'>
                          <img src={assets.cancel_icon} alt="cancel" onClick={() => cancelAppointment(item._id)} className='cursor-pointer' />
                          <img src={assets.tick_icon} alt="accept" onClick={() => completeAppointment(item._id)} className='cursor-pointer' />
                        </div>
                  }
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DoctorDashboard;

import React from 'react';
import { useContext } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { useEffect } from 'react';
import { AppContext } from '../../context/AppContext';

const AllAppointments = () => {

  const { aToken, appointments, getAllAppointments, cancelAppointment } = useContext(AdminContext)
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext)

  useEffect(() => {
    if (aToken) {
      getAllAppointments()
    }
  }, [aToken])

  return (
    <div className='w-full px-4 sm:px-6 lg:px-8 py-6'>
      <div className='flex items-center justify-between mb-6'>
        <div>
          <h1 className='text-2xl font-bold text-gray-800'>
            All Appointments
          </h1>
          <p className='text-sm text-gray-500 mt-1'>
            Manage and monitor patient appointments
          </p>
        </div>

        <div className='bg-primary/10 text-primary px-4 py-2 rounded-xl text-sm font-semibold'>
          Total : {appointments?.length || 0}
        </div>
      </div>

      <div className='bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden'>
        <div className='hidden md:grid grid-cols-[0.5fr_2fr_0.7fr_2fr_2fr_1fr_1fr] gap-4 px-6 py-4 bg-gray-50 border-b text-sm font-semibold text-gray-700'>
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Actions</p>
        </div>
        <div className='divide-y divide-gray-100'>

          {appointments?.map((item, index) => (
            <div
              key={index}
              className='grid grid-cols-1 md:grid-cols-[0.5fr_2fr_0.7fr_2fr_2fr_1fr_1fr] gap-4 px-6 py-5 items-center hover:bg-gray-50 transition-all duration-200'
            >

              <div className='md:hidden flex justify-between items-center mb-2'>
                <p className='font-semibold text-primary'>
                  Appointment #{index + 1}
                </p>

                <span className='text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full'>
                  Confirmed
                </span>
              </div>

              <p className='text-gray-600 hidden md:block'>
                {index + 1}
              </p>

              <div className='flex items-center gap-3'>
                <img
                  src={item.userData?.image}
                  alt=""
                  className='w-12 h-12 rounded-full object-cover border'
                />

                <div>
                  <p className='font-semibold text-gray-800'>
                    {item.userData?.name}
                  </p>

                  <p className='text-sm text-gray-500'>
                    {item.userData?.email}
                  </p>
                </div>
              </div>

              <p className='text-gray-700'>
                {calculateAge(item.userData.dob)}
              </p>

              <div>
                <p className='font-medium text-gray-700'>
                  {slotDateFormat(item.slotDate)}
                </p>

                <p className='text-sm text-gray-500'>
                  {item.slotTime}
                </p>
              </div>

              <div className='flex items-center gap-3'>
                <img
                  src={item.docData?.image}
                  alt=""
                  className='w-10 h-10 rounded-full object-cover border'
                />

                <div>
                  <p className='font-medium text-gray-800'>
                    {item.docData?.name}
                  </p>

                  <p className='text-sm text-gray-500'>
                    {item.docData?.speciality}
                  </p>
                </div>
              </div>

              <p className='font-semibold text-primary'>
                {currency}{item.amount}
              </p>

              {item.cancelled
                ? <p className='px-4 py-2 text-sm rounded-lg border border-red-300 text-red-500'>Cancelled</p>
                : <div className='flex items-center gap-2'>
                  <button onClick={() => cancelAppointment(item._id)} className='px-4 py-2 text-sm rounded-lg border border-red-300 text-red-500 hover:bg-red-50 transition'>
                    Cancel
                  </button>
                </div>}

            </div>
          ))}

        </div>

        {appointments?.length === 0 && (
          <div className='py-16 text-center'>
            <p className='text-gray-400 text-lg'>
              No appointments found
            </p>
          </div>
        )}

      </div>
    </div>
  );
}

export default AllAppointments;

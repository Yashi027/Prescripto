import React, { useEffect } from 'react';
import { useContext } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets';

const DoctorAppointments = () => {

  const { dToken, appointments, getAppointments, completeAppointment, cancelAppointment } = useContext(DoctorContext);
  const { slotDateFormat, calculateAge } = useContext(AppContext);

  useEffect(() => {
    if (dToken) {
      getAppointments()
    }
  }, [dToken])
  return (
    <div className="w-full p-4">
      <h2 className="text-xl font-semibold mb-4">All Appointments</h2>

      <div className="hidden md:block bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">#</th>
              <th className="p-3 text-left">Patient</th>
              <th className="p-3 text-left">Payment</th>
              <th className="p-3 text-left">Age</th>
              <th className="p-3 text-left">Date & Time</th>
              <th className="p-3 text-left">Fees</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {appointments.map((item, index) => (
              <tr key={index} className="border-t">
                <td className="p-3">{index + 1}</td>
                <td className="p-3 flex flex-row items-center">
                  <img
                    src={item.userData?.image}
                    alt=""
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  {item.userData?.name}
                </td>
                <td className="p-3">
                  {item.payment ? "Paid" : "Pending"}
                </td>
                <td className="p-3">{calculateAge(item.userData?.dob)}</td>
                <td className="p-3">
                  {slotDateFormat(item.slotDate)} | {item.slotTime}
                </td>
                <td className="p-3">${item.amount}</td>
                <td className="p-3">
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="md:hidden space-y-4">
        {appointments.map((item, index) => {
          return (
            <div
              key={index}
              className="bg-white rounded-lg shadow p-4"
            >
              <div className="flex items-center gap-3 mb-3">
                <img
                  src={item.userData?.image}
                  alt=""
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold">
                    {item.userData?.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    Age: {calculateAge(item.userData?.dob)}
                  </p>
                </div>
              </div>

              <div className="space-y-1 text-sm">
                <p>
                  <span className="font-medium">Payment:</span>{" "}
                  {item.payment ? "Paid" : "Pending"}
                </p>

                <p>
                  <span className="font-medium">Date:</span>{" "}
                  {slotDateFormat(item.slotDate)} | {item.slotTime}
                </p>

                <p>
                  <span className="font-medium">Fees:</span> $
                  {item.amount}
                </p>
              </div>
              {
                item.cancelled
                  ? <p className='border text-red-500 p-4 rounded-xl'>Cancelled</p>
                  : item.isCompleted
                    ? <p className='border text-green-500 p-4 rounded-xl'>Completed</p>
                    : <div className='flex flex-row'>
                      <img src={assets.cancel_icon} alt="cancel" onClick={() => cancelAppointment(item._id)} className='cursor-pointer' />
                      <img src={assets.tick_icon} alt="accept" onClick={() => completeAppointment(item._id)} className='cursor-pointer' />
                    </div>
              }
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default DoctorAppointments;

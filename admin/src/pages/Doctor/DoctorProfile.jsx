import React, { useContext, useEffect } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { AppContext } from '../../context/AppContext';

const DoctorProfile = () => {

  const { dToken, profileData, setProfileData, getProfileData } = useContext(DoctorContext)
  const { currency, backendUrl } = useContext(AppContext)

  useEffect(() => {
    if (dToken) {
      getProfileData()
    }
  }, [dToken])

  return profileData && (
    <div className="w-full p-4 md:p-8">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

        <div className="flex flex-col lg:flex-row">

          <div className="lg:w-1/3 bg-blue-50 flex justify-center items-center p-6">
            <img
              src={profileData.image}
              alt={profileData.name}
              className="w-52 h-52 md:w-64 md:h-64 rounded-2xl object-cover shadow-md"
            />
          </div>

          <div className="flex-1 p-6 md:p-8">

            <h2 className="text-3xl font-bold text-gray-800">
              {profileData.name}
            </h2>

            <div className="flex flex-wrap items-center gap-3 mt-3">
              <p className="text-gray-600 text-lg">
                {profileData.degree} • {profileData.speciality}
              </p>

              <span className="px-4 py-1 text-sm font-medium bg-blue-100 text-blue-700 rounded-full">
                {profileData.experience}
              </span>
            </div>

            <div className="mt-6">
              <h3 className="font-semibold text-lg text-gray-800 mb-2">
                About
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {profileData.about}
              </p>
            </div>

            <div className="mt-6">
              <p className="text-lg">
                <span className="font-semibold text-gray-800">
                  Appointment Fee:
                </span>{' '}
                <span className="text-green-600 font-bold">
                  {currency}{profileData.fees}
                </span>
              </p>
            </div>

            <div className="mt-6">
              <h3 className="font-semibold text-lg text-gray-800 mb-2">
                Address
              </h3>
              <p className="text-gray-600">
                {profileData.address.line1}
              </p>
            </div>

            <div className="mt-6 flex items-center gap-3">
              <input
                type="checkbox"
                checked={profileData.available}
                readOnly
                className="w-5 h-5 accent-blue-600 cursor-pointer"
              />
              <label className="text-gray-700 font-medium">
                Available for Appointments
              </label>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <button className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-300">
                Edit Profile
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default DoctorProfile;

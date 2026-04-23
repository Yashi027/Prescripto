import React, { useState } from 'react';
import { assets } from '../assets/assets_frontend/assets';

const MyProfile = () => {

  const [userData, setUserData] = useState({
    name: 'Richard',
    image: assets.profile_pic,
    email: 'richardjames@gmail.com',
    phone: '+1 123 456 7890',
    address: {
      line1: '57th Cross Richmond',
      line2: 'Circle, Church road, London'
    },
    gender: 'Male',
    dob: '2000-01-04'
  });

  const [isEdit, setIsEdit] = useState(false);

  return (
    <div className="max-w-4xl mx-auto p-6">

      <div className="bg-white shadow-xl rounded-2xl p-8 border border-gray-100">

        <div className="flex flex-col md:flex-row items-center gap-8">

          <img
            src={userData.image}
            alt="Profile"
            className="w-36 h-36 rounded-full object-cover border-4 border-blue-100 shadow-md"
          />

          <div className="flex-1 text-center md:text-left">
            {
              isEdit ? (
                <input
                  type="text"
                  value={userData.name}
                  onChange={(e) =>
                    setUserData(prev => ({ ...prev, name: e.target.value }))
                  }
                  className="text-3xl font-bold border-b-2 border-blue-400 outline-none px-2 py-1 w-full md:w-80"
                />
              ) : (
                <h2 className="text-3xl font-bold text-gray-800">
                  {userData.name}
                </h2>
              )
            }

            <p className="text-gray-500 mt-2">Patient Profile</p>
          </div>
        </div>

        <hr className="my-8 border-gray-200" />

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-blue-600 mb-4">
            CONTACT INFORMATION
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-gray-700">

            <div>
              <p className="font-medium">Email:</p>
              <p className="text-gray-600">{userData.email}</p>
            </div>

            <div>
              <p className="font-medium">Phone:</p>
              {
                isEdit ? (
                  <input
                    type="text"
                    value={userData.phone}
                    onChange={(e) =>
                      setUserData(prev => ({ ...prev, phone: e.target.value }))
                    }
                    className="border rounded-lg px-3 py-2 w-full mt-1 outline-none focus:ring-2 focus:ring-blue-300"
                  />
                ) : (
                  <p className="text-gray-600">{userData.phone}</p>
                )
              }
            </div>

            <div className="md:col-span-2">
              <p className="font-medium">Address:</p>

              {
                isEdit ? (
                  <div className="space-y-2 mt-1">
                    <input
                      type="text"
                      value={userData.address.line1}
                      onChange={(e) =>
                        setUserData(prev => ({
                          ...prev,
                          address: {
                            ...prev.address,
                            line1: e.target.value
                          }
                        }))
                      }
                      className="border rounded-lg px-3 py-2 w-full outline-none focus:ring-2 focus:ring-blue-300"
                    />

                    <input
                      type="text"
                      value={userData.address.line2}
                      onChange={(e) =>
                        setUserData(prev => ({
                          ...prev,
                          address: {
                            ...prev.address,
                            line2: e.target.value
                          }
                        }))
                      }
                      className="border rounded-lg px-3 py-2 w-full outline-none focus:ring-2 focus:ring-blue-300"
                    />
                  </div>
                ) : (
                  <p className="text-gray-600">
                    {userData.address.line1}
                    <br />
                    {userData.address.line2}
                  </p>
                )
              }
            </div>

          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-blue-600 mb-4">
            BASIC INFORMATION
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-gray-700">

            <div>
              <p className="font-medium">Gender:</p>
              <p className="text-gray-600">{userData.gender}</p>
            </div>

            <div>
              <p className="font-medium">Date of Birth:</p>
              <p className="text-gray-600">{userData.dob}</p>
            </div>

          </div>
        </div>

        <div className="mt-10 text-center">
          {
            isEdit ? (
              <button
                onClick={() => setIsEdit(false)}
                className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-xl font-medium transition duration-300 shadow-md"
              >
                Save Information
              </button>
            ) : (
              <button
                onClick={() => setIsEdit(true)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-xl font-medium transition duration-300 shadow-md"
              >
                Edit Profile
              </button>
            )
          }
        </div>

      </div>
    </div>
  );
};

export default MyProfile;
import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { AdminContext } from '../context/AdminContext'
import { useNavigate } from 'react-router-dom'
import { DoctorContext } from '../context/DoctorContext'

const Navbar = () => {

    const { aToken, setAToken } = useContext(AdminContext);
    const { dToken, setDToken } = useContext(DoctorContext)

    const navigate = useNavigate();

    const logout = () => {
        navigate('/');
        if (aToken) {
            setAToken('')
            localStorage.removeItem('aToken')
        }
        if (dToken) {
            setDToken('')
            localStorage.removeItem('dToken')
        }
    }

    return (
        <div className='flex justify-between items-center px-6 sm:px-10 py-4 bg-white border-b border-gray-200 shadow-sm'>
            <div className='flex items-center gap-4 text-xs'>
                <img
                    className='h-10 w-auto object-contain'
                    src={assets.admin_logo}
                    alt="Logo"
                />
                <p className='text-sm sm:text-base font-semibold text-gray-700 tracking-wide'>
                    {aToken ? 'Admin' : 'Doctor'}
                </p>
            </div>
            <button onClick={logout} className='px-5 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-all duration-300 shadow-sm'>
                Logout
            </button>
        </div>
    )
}

export default Navbar
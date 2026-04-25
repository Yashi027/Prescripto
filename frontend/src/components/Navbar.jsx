import React from 'react';
import {assets} from '../assets/assets_frontend/assets'
import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Navbar = () => {
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false)
    const [token,setToken] = useState(true)
  return (
    <div className='flex items-center justify-between border-b border-b-gray-400 text-sm py-4 mb-5 '>
      <img className='w-44 cursor-pointer' src={assets.logo} alt="Logo" onClick={() => navigate('/')}/>
      <ul className='hidden md:flex items-start gap-5 font-medium'>
        <NavLink to='/'>
            <li className='py-1'>HOME</li>
            <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden'/>
        </NavLink>
        <NavLink to='/doctors'>
            <li className='py-1'>ALL DOCTORS</li>
            <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden'/>
        </NavLink>
        <NavLink to='/about'>
            <li className='py-1'>ABOUT</li>
            <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden'/>
        </NavLink>
        <NavLink to='/contact'>
            <li className='py-1'>CONTACT</li>
            <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden'/>
        </NavLink>
      </ul>
      <div className='flex items-center gap-4'>
        {
            token
            ?<div className='flex items-center gap-2 cursor-pointer group relative'>
                <img src={assets.profile_pic} alt="Profile" className='w-8 rounded-full'/>
                <img src={assets.dropdown_icon} alt="Dropdown" className='w-2.5' />
                <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
                    <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4'>
                        <p onClick={() => navigate('/my-profile')} className='hover:text-black cursor-pointer'>My Profile</p>
                        <p onClick={() => navigate('/my-appointments')} className='hover:text-black cursor-pointer'>My Appointments</p>
                        <p onClick={() => setToken(false)} className='hover:text-black cursor-pointer'>Logout</p>
                    </div>
                </div>
            </div>
            :<button onClick={() => navigate('/login')} className='bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block cursor-pointer'>Create Account</button>
        }
        <img src={assets.menu_icon} alt="Menu" className='w-6 md:hidden' onClick={() => setShowMenu(true)}/>
        <div className={`${showMenu ? 'fixed w-full' : 'h-0 w-0'} md:hidden right-0 bottom-0 top-0 z-20 bg-white transition-all overflow-hidden`}>
            <div className='flex items-center justify-between px-5 py-6'>
                <img src={assets.logo} alt="" className='w-36'/>
                <img src={assets.cross_icon} alt="" onClick={() => setShowMenu(false)} className='w-7'/>
            </div>
            <ul className='flex flex-col gap-4 mt-8 px-6 text-lg font-semibold text-gray-700'>
            {[
              ['/', 'HOME'],
              ['/doctors', 'ALL DOCTORS'],
              ['/about', 'ABOUT'],
              ['/contact', 'CONTACT'],
            ].map(([path, label], index) => (
              <NavLink
                key={index}
                to={path}
                onClick={() => setShowMenu(false)}
              >
                <li className='bg-white shadow-md px-5 py-4 rounded-xl hover:bg-primary hover:text-white transition-all duration-300'>
                  {label}
                </li>
              </NavLink>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;

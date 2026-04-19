import React from 'react';
import { assets } from '../assets/assets_frontend/assets';

const Footer = () => {
  return (
    <div className='md:mx-10'>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>

        <div>
            <img src={assets.logo} alt="Logo" className='mb-5 w-40'/>
            <p className='w-full md:w-2/3 text-gray-600 leading-6'>Book appointments with experienced doctors, manage your health records, and receive quality care anytime, anywhere.</p>
        </div>

        <div>
            <p className='text-xl font-medium mb-5'>COMPANY</p>
            <ul className='flex flex-col gap-2 text-gray-600'>
                <li>Home</li>
                <li>About Us</li>
                <li>Contact Us</li>
                <li>Privacy Policy</li>
            </ul>
        </div>

        <div>
            <p className='text-xl font-medium mb-5'>Get In Touch</p>
            <ul className='flex flex-col gap-2 text-gray-600'>
                <li>+1 212-456-789</li>
                <li>prescripto@gmail.com</li>
            </ul>
        </div>

        <div>
            <hr />
            <p className='py-5 '>&copy; 2026 Prescripto. All Rights Reserved.</p>
        </div>

      </div>
    </div>
  );
}

export default Footer;

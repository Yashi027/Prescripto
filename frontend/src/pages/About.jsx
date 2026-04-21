import React from 'react';
import { assets } from '../assets/assets_frontend/assets';

const About = () => {
  return (
    <div>

      <div className='text-center text-2xl pt-10 text-gray-500'>
        <p>ABOUT <span className='text-gray-700 font-medium'>US</span></p>
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-12'>
        <img src={assets.about_image} alt="Image" className='w-full md:max-w-[360px]' />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600'>
          <p>Welcome to Prescripto – your trusted digital healthcare companion, designed to make booking doctor appointments simple, fast, and stress-free.</p>
          <p>At Prescripto, we believe that quality healthcare should be accessible to everyone. Our platform connects patients with experienced doctors across various specialties, allowing users to book appointments online anytime, anywhere.</p>
          <b className='text-gray-800'>Our Mission</b>
          <p>Our mission is to bridge the gap between patients and healthcare providers through technology. We aim to simplify the appointment process, reduce waiting times, and provide a smooth healthcare experience for both patients and doctors.</p>
        </div>
      </div>

      <div className='text-xl my-4'>
        <p>WHY <span className='text-gray-700 font-semibold'>CHOOSE US</span></p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-20'>

        <div className='bg-white border rounded-2xl shadow-sm hover:shadow-xl px-8 py-10 flex flex-col gap-4 transition-all duration-300 hover:-translate-y-2 cursor-pointer group'>
          <b className='text-lg text-gray-800'>Efficiency</b>
          <p className='text-gray-600 leading-6'>Streamlined appointment scheduling that fits into your busy lifestyle.</p>
        </div>

        <div className='bg-white border rounded-2xl shadow-sm hover:shadow-xl px-8 py-10 flex flex-col gap-4 transition-all duration-300 hover:-translate-y-2 cursor-pointer group'>
          <b className='text-lg text-gray-800'>Convenience</b>
          <p className='text-gray-600 leading-6'>Access to a network of trusted healthcare professionals in your area.</p>
        </div>

        <div className='bg-white border rounded-2xl shadow-sm hover:shadow-xl px-8 py-10 flex flex-col gap-4 transition-all duration-300 hover:-translate-y-2 cursor-pointer group'>
          <b className='text-lg text-gray-800'>Personalization</b>
          <p className='text-gray-600 leading-6'>Tailored recommendations and reminders to help you stay on top of your health.</p>
        </div>
      </div>

    </div>
  );
}

export default About;

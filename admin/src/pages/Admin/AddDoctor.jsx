import React from 'react';
import { assets } from '../../assets/assets';

const AddDoctor = () => {
  return (
    <form className='m-5 w-full'>

      <p className='font-medium mb-3 text-lg'>Add Doctor</p>

      <div className='bg-white px-8'>
        <div className='flex items-center gap-4 mb-8 text-gray-600'>
          <label htmlFor="doc-img">
            <img src={assets.upload_area} alt="Upload" className='w-16 bg-gray-100 rounded-full cursor-pointer' />
          </label>
          <input type="file" id="doc-img" className='hidden' />
          <p>Upload Doctor <br /> picture</p>
        </div>

        <div className='flex flex-col lg:flex-row items-start gap-10 text-gray-600'>
          <div className='w-full lg:flex-1 flex flex-col gap-4'>
            <div className='flex-1 flex flex-col gap-1'>
              <p>Doctor Name</p>
              <input type="text" placeholder='Full Name' className='border rounded px-3 py-2' required />
            </div>
            <div className='flex-1 flex flex-col gap-1'>
              <p>Doctor Email</p>
              <input type="email" placeholder='Email' className='border rounded px-3 py-2' required />
            </div>
            <div className='flex-1 flex flex-col gap-1'>
              <p>Doctor Password</p>
              <input type="password" placeholder='Password' className='border rounded px-3 py-2' required />
            </div>
            <div className='flex-1 flex flex-col gap-1'>
              <p>Doctor's Experience</p>
              <select name="" id="" className='border rounded px-3 py-2'>
                <option value="1 Year">1 Year</option>
                <option value="2 Year">2 Year</option>
                <option value="3 Year">3 Year</option>
                <option value="4 Year">4 Year</option>
                <option value="5 Year">5 Year</option>
                <option value="6 Year">6 Year</option>
                <option value="7 Year">7 Year</option>
                <option value="8 Year">8 Year</option>
                <option value="8+ Years">8+ Years</option>
              </select>
            </div>
            <div className='flex-1 flex flex-col gap-1'>
              <p>Doctor's Fees</p>
              <input type="number" placeholder='fees' className='border rounded px-3 py-2' required />
            </div>
          </div>

          <div className='w-full lg:flex-1 flex flex-col gap-4'>
            <div className='flex-1 flex flex-col gap-1'>
              <p>Speciality</p>
              <select className='border rounded px-3 py-2' name="" id="">
                <option value="General physician">General physician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatricians">Pediatricians</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
              </select>
            </div>
            <div className='flex-1 flex flex-col gap-1'>
              <p>Education</p>
              <input type="text" placeholder='Education' className='border rounded px-3 py-2' required />
            </div>
            <div className='flex-1 flex flex-col gap-1'>
              <p>Address</p>
              <input type="text" placeholder='Address' className='border rounded px-3 py-2' required />
            </div>
          </div>
        </div>

        <div className='flex-1 flex flex-col gap-1'>
          <p className='mt-4 mb-2'>About Doctor</p>
          <textarea placeholder='Write About Doctor' rows={5} className='w-full px-4 pt-2 border rounded' required />
        </div>

        <button className='bg-primary text-white rounded-full px-10 py-3 mt-4'>Add Doctor</button>

      </div>

    </form>
  );
}

export default AddDoctor;

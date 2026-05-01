import React, { useContext, useState } from 'react';
import { assets } from '../../assets/assets';
import { AdminContext } from '../../context/AdminContext';
import {toast} from 'react-toastify';
import axios from 'axios';

const AddDoctor = () => {

  const [docImg, setDocImg] = useState(false)
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [about, setAbout] = useState('')
  const [degree, setDegree] = useState('')
  const [experience, setExperience] = useState('1 Year')
  const [fees,setFees] = useState('')
  const [speciality, setSpeciality] = useState('General physician')
  const [address, setAddress] = useState('')

  const {backendUrl, aToken} = useContext(AdminContext)

  const onSubmitHandler = async(e) => {
    e.preventDefault();

    try {
      if(!docImg){
        return toast.error("Image Not Selected")
      }
      const formData = new FormData()
      formData.append('image',docImg)
      formData.append('name',name)
      formData.append('email',email)
      formData.append('password',password)
      formData.append('degree',degree)
      formData.append('experience',experience)
      formData.append('fees',Number(fees))
      formData.append('about',about)
      formData.append('speciality',speciality)
      formData.append('address',JSON.stringify({line1:address}))

      formData.forEach((value,key) => {
        console.log(`${key} : ${value}`)
      })

      const {data} = await axios.post(backendUrl+'/api/admin/add-doctor' , formData, {headers:{aToken}})

      if(data.success){
        toast.success(data.message)
        setDocImg(false)
        setName('')
        setEmail('')
        setPassword('')
        setDegree('')
        setFees('')
        setAbout('')
        setAddress('')
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }
  return (
    <form className='m-5 w-full' onSubmit={onSubmitHandler}>

      <p className='font-medium mb-3 text-lg'>Add Doctor</p>

      <div className='bg-white px-8 py-8 rounded w-full max-w-5xl '>
        <div className='flex items-center gap-4 mb-8 text-gray-600'>
          <label htmlFor="doc-img">
            <img src={docImg ? URL.createObjectURL(docImg) :assets.upload_area} alt="Upload" className='w-16 bg-gray-100 rounded-full cursor-pointer' />
          </label>
          <input type="file" id="doc-img" className='hidden' onChange={(e) => setDocImg(e.target.files[0])} />
          <p>Upload Doctor <br /> picture</p>
        </div>

        <div className='flex flex-col lg:flex-row items-start gap-10 text-gray-600'>
          <div className='w-full lg:flex-1 flex flex-col gap-4'>
            <div className='flex-1 flex flex-col gap-1'>
              <p>Doctor Name</p>
              <input onChange={(e) => setName(e.target.value)} value={name} type="text" placeholder='Full Name' className='border rounded px-3 py-2' required />
            </div>
            <div className='flex-1 flex flex-col gap-1'>
              <p>Doctor Email</p>
              <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder='Email' className='border rounded px-3 py-2' required />
            </div>
            <div className='flex-1 flex flex-col gap-1'>
              <p>Doctor Password</p>
              <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder='Password' className='border rounded px-3 py-2' required />
            </div>
            <div className='flex-1 flex flex-col gap-1'>
              <p>Doctor's Experience</p>
              <select onChange={(e) => setExperience(e.target.value)} value={experience} className='border rounded px-3 py-2'>
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
              <input onChange={(e) => setFees(e.target.value)} value={fees} type="number" placeholder='fees' className='border rounded px-3 py-2' required />
            </div>
          </div>

          <div className='w-full lg:flex-1 flex flex-col gap-4'>
            <div className='flex-1 flex flex-col gap-1'>
              <p>Speciality</p>
              <select className='border rounded px-3 py-2' onChange={(e) => setSpeciality(e.target.value)} value={speciality}>
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
              <input onChange={(e) => setDegree(e.target.value)} value={degree} type="text" placeholder='Education' className='border rounded px-3 py-2' required />
            </div>
            <div className='flex-1 flex flex-col gap-1'>
              <p>Address</p>
              <input onChange={(e) => setAddress(e.target.value)} value={address} type="text" placeholder='Address' className='border rounded px-3 py-2' required />
            </div>
          </div>
        </div>

        <div className='flex-1 flex flex-col gap-1'>
          <p className='mt-4 mb-2'>About Doctor</p>
          <textarea onChange={(e) => setAbout(e.target.value)} value={about} placeholder='Write About Doctor' rows={5} className='w-full px-4 pt-2 border rounded' required />
        </div>

        <button type='submit' className='bg-primary text-white rounded-full px-10 py-3 mt-4'>Add Doctor</button>

      </div>

    </form>
  );
}

export default AddDoctor;

import React, { useContext, useState } from 'react'
import { userdatacontext } from '../context/Usercontext'
import axios from 'axios'
import { IoArrowBackOutline } from "react-icons/io5";
import { Navigate, useNavigate } from 'react-router-dom';

function Customize2() {

  const { userdata, selectedImage, backendImage, serverUrl, setuserdata } = useContext(userdatacontext)

  const [loading, setloading] = useState(false)
  const [asssistantName, setassistantName] = useState(userdata?.AsssistantName || "")
  const navigate = useNavigate()

  async function handleUpdateAssistant() {
    setloading(true)

    try {

      let formData = new FormData()
      formData.append("assistantName", asssistantName)

      if (backendImage) {
        formData.append("assistantImage", backendImage)
      } else {
        formData.append("imageUrl", selectedImage)
      }

      const result = await axios.post(
        `${serverUrl}/api/user/update`,
        formData,
        { withCredentials: true }
      )

      setloading(false)
      console.log(result.data)
      setuserdata(result.data)
      return true

    } catch (error) {
      console.log(error)
      setloading(false)
      return false
    }
  }

  return (

    <div  className='w-full min-h-screen bg-gradient-to-t from-[black] to-[#0b0250]
      flex justify-center items-center flex-col relative  px-4 py-8 overflow-x-hidden'  >

      {/* Back Button */}
      <IoArrowBackOutline  className='text-white  w-[35px] h-[35px]  sm:w-[45px] sm:h-[45px]
        md:w-[55px] md:h-[55px] lg:w-[65px] lg:h-[65px] absolute top-[25px] left-[25px]
        sm:top-[40px] sm:left-[40px] md:top-[60px] md:left-[70px]  cursor-pointer'
        onClick={() => navigate('/customize')} />

      {/* Heading */}
      <h1  className='text-white  text-[32px]  sm:text-[42px]  md:text-[55px]  lg:text-[70px]
        mb-[30px]  sm:mb-[40px]  md:mb-[50px]  text-center  leading-tight  font-semibold' >
        Select your <span className='ml-2 sm:ml-4 md:ml-6 text-[#9898e5f4]'>  Assistant Name </span>
      </h1>

      {/* Assistant Name Input */}
      <input  type="text" placeholder="eg Shifra"  className='w-full  max-w-[700px]  h-[55px]
        sm:h-[65px]  md:h-[75px] bg-transparent text-white text-[20px] sm:text-[24px]
        md:text-[28px]  placeholder-gray-300  outline-none  border-2  border-white
        font-semibold rounded-full px-5 sm:px-7  md:px-8  py-3 text-center' required
        onChange={(e) => setassistantName(e.target.value)}  value={asssistantName} />

      {/* Create Button */}
      {asssistantName && (
  <button
          className='w-full max-w-[300px] sm:max-w-[400px] md:max-w-[550px] lg:max-w-[700px] min-h-[60px]
       sm:min-h-[70px] md:min-h-[80px] bg-white  text-[18px]  sm:text-[22px]  md:text-[28px] lg:text-[32px]
 cursor-pointer font-bold rounded-full px-5 py-3 mt-[25px] sm:mt-[35px] md:mt-[45px]'
          onClick={async() => {
            const success = await  handleUpdateAssistant()
            
           if(success){
            navigate('/')
           } 
            
          }}
        >
          {loading ? "Loading...." : "Finally create your assistant"}
        </button>
      )}

    </div>
  )
}

export default Customize2
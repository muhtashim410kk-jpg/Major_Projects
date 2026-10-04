import React, { useContext, useRef } from 'react'
import { LuImagePlus } from "react-icons/lu";
import Card from '../components/Card'
import image1 from '../assets/chat1.png'
import image2 from '../assets/chat2.png'
import image3 from '../assets/chat3.png'
import image4 from '../assets/chat10.png'
import image5 from '../assets/chat8.png'
import { userdatacontext } from '../context/Usercontext';
import { useNavigate } from 'react-router-dom'
import { IoArrowBackOutline } from "react-icons/io5";

function Customize() {

  const { serverUrl, userdata, setuserdata, frontendImage, selectedImage, setselectedImage,
    setfrontendImage, backendImage, setbackendImage } = useContext(userdatacontext)

  const navigate = useNavigate()
  const inputImage = useRef()

  function handleImage(e) {
    const file = e.target.files[0]

    setbackendImage(file)
    setfrontendImage(URL.createObjectURL(file))
  }

  return (

    <div className='w-full min-h-screen bg-gradient-to-t from-[black] to-[#0b0250]
      flex flex-col justify-center items-center
      px-4 py-8 overflow-x-hidden'>

      {/* Back Button */}
      <IoArrowBackOutline  className='text-white w-[35px] h-[35px]  sm:w-[45px] sm:h-[45px]
          md:w-[55px] md:h-[55px]  absolute  top-[25px] left-[25px]  sm:top-[35px] sm:left-[35px]
          md:top-[50px] md:left-[60px]  cursor-pointer'  onClick={() => navigate('/')} />

      {/* Heading */}
   <h1 className='text-white text-[30px]  sm:text-[40px]  md:text-[55px] 
   lg:text-[70px]  mb-[30px]  sm:mb-[40px] md:mb-[50px] text-center leading-tight'  >
   Select your <span className='ml-2 sm:ml-4 md:ml-6 text-[#9898e5f4]'>  Assistant Image </span>
 </h1>

      {/* Image Grid */}
      <div  className='  w-full  max-w-[1200px]  grid  grid-cols-2  sm:grid-cols-3 lg:grid-cols-6
          gap-[15px]  sm:gap-[20px]  md:gap-[25px]  px-2 ' >

        <Card image={image1} />
        <Card image={image2} />
        <Card image={image3} />
        <Card image={image4} />
        <Card image={image5} />

        {/* Upload Card */}
   <div  className={`w-full aspect-[4/5]  bg-[#0303200f]  border-2 border-[#b6b6b6]
       hover:shadow-2xl hover:shadow-gray-500 hover:border-white rounded-2xl
        overflow-hidden cursor-pointer  flex justify-center items-center  transition-all duration-200
        ${selectedImage == "input" ? "border-8 border-white shadow-2xl shadow-amber-50"  : "" }`}
          onClick={() => {
            inputImage.current.click()
            setselectedImage("input")
          }} >

          {!frontendImage && (
            <LuImagePlus className='text-white w-[45px] h-[45px] sm:w-[55px] sm:h-[55px]
                md:w-[65px] md:h-[65px]' />
          )}

          {frontendImage && (
            <img  src={frontendImage}  className='w-full h-full object-cover' />
          )}

        </div>

        <input type="file" accept='image/*' hidden ref={inputImage}  onChange={handleImage} />

      </div>

      {/* Next Button */}
      {selectedImage && (
   <button  className=' w-full  max-w-[220px]  sm:max-w-[280px]  md:max-w-[350px]
       h-[55px]  sm:h-[65px]  md:h-[75px]  bg-white  text-[20px]  sm:text-[24px]
      md:text-[30px]  cursor-pointer  font-bold  rounded-full mt-[25px]  sm:mt-[35px]  md:mt-[45px] '
          onClick={() => navigate('/customize2')} >  Next </button>
      )}

    </div>
  )
}

export default Customize
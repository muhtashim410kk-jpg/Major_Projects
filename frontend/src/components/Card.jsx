import React, { useContext } from 'react'
import { userdatacontext } from '../context/Usercontext'

function Card({ image }) {

  const {  serverUrl,  userdata, setuserdata, frontendImage, selectedImage,
    setselectedImage, setfrontendImage, backendImage, setbackendImage } = useContext(userdatacontext)

  return (

    <div  className={`w-full aspect-[4/5] bg-[#0303200f]  border-2 border-[#b6b6b6]
        hover:shadow-2xl hover:shadow-gray-500  hover:border-white rounded-2xl
        overflow-hidden  cursor-pointer  transition-all duration-200
        ${selectedImage == image
          ? "border-8 border-white shadow-2xl shadow-amber-50"
          : ""
        }`}
      onClick={() => {
        setselectedImage(image)
        setfrontendImage(null)
        setbackendImage(null)
      }}
    >

      <img  src={image} className='w-full h-full object-cover' />

    </div>
  )
}

export default Card
import React, { useContext } from 'react'
import { userdatacontext } from '../context/Usercontext'

function Card({image}) {
  

     const { serverUrl,userdata,setuserdata,frontendImage,selectedImage,setselectedImage,
       setfrontendImage,backendImage,setbackendImage} = useContext(userdatacontext) 

  return (
    <div className={` w-[100px] h-[100px] lg:w-[800px] lg:h-[900px] bg-[#0303200f] border-2 
    hover:shadow-2xl hover:shadow-gray-500 hover:border-2 hover:border-white
 border-[#b6b6b6] rounded-2xl overflow-hidden cursor-pointer 
 ${selectedImage==image? "border-8 border-white shadow-2xl shadow-amber-50" :null } `} 
     onClick={()=>setselectedImage(image)} >
      
        <img src={image} className='h-full object-cover' />

    </div>
  )
}

export default Card

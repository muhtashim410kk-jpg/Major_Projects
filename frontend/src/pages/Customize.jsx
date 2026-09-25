
 import React, { use, useContext, useRef, useState } from 'react'
import { LuImagePlus } from "react-icons/lu";
import Card from '../components/Card'
import image1 from '../assets/chat1.png'
import image2 from '../assets/chat2.png'
import image3 from '../assets/chat3.png'
import image4 from '../assets/chat10.png'
import image5 from '../assets/chat8.png'
import { userdatacontext } from '../context/Usercontext';
import {Navigate, useNavigate}  from 'react-router-dom'



 
 function Customize() {

  const { serverUrl,userdata,setuserdata,frontendImage,selectedImage,setselectedImage,
    setfrontendImage,backendImage,setbackendImage} = useContext(userdatacontext) 

   const navigate = useNavigate()
    const inputImage = useRef()

    function handleImage(e){
      const file = e.target.files[0]
      setbackendImage(file)
      setfrontendImage(URL.createObjectURL(file))
    }

   return (
     <div className='w-full h-[100vh] bg-gradient-to-t from-[black] to-[#0b0250] 
     flex justify-center items-center flex-col' >
       
       <h1 className='text-white text-[100px] mb-[60px] text-center'>Select your
         <span className=' ml-[32px] text-[#9898e5f4]'>Assistant Image</span></h1>
       <div className='w-[90%] max-w-[60%] flex justify-center items-center flex-wrap gap-[40px] p-[20px]'> 

     <Card image={image1}/>
     <Card image={image2}/>
     <Card image={image3}/>
     <Card image={image4}/>
     <Card image={image5}/>

       <div className={`w-[90px] h-[90px]    lg:w-[800px] lg:h-[900px] bg-[#0303200f] border-2 
    hover:shadow-2xl hover:shadow-gray-500 hover:border-2 hover:border-white
     border-[#b6b6b6] rounded-2xl overflow-hidden cursor-pointer flex justify-center items-center 
       ${selectedImage=="input"? "border-8 border-white shadow-2xl shadow-amber-50" :null }  `} 
     onClick={()=>{inputImage.current.click()
          setselectedImage("input")
     }} >
      
      {!frontendImage && <LuImagePlus className='text-white w-[70px] h-[50px]' /> }
      
      {frontendImage && <img src={frontendImage} className='h-full object-cover' /> }
        

    </div>
       <input type="file" accept='image/*' hidden ref={inputImage} onChange={handleImage} />
     </div>

       {selectedImage?    <button className='max-w-[400px] w-[400px] max-h-[400px] h-[160px] bg-white
       text-[60px] cursor-pointer font-bold rounded-full p-[12px] mt-[50px]'
        onClick={()=>navigate('/customize2')}  >Next</button> : null}
        
       


     </div>
   )
 }
 
 export default Customize
 
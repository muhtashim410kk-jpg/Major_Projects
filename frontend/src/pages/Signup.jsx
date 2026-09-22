import React, { useState }  from "react";
import img1 from '../assets/robotbackground.jpg'
import { IoIosEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";

 function Signup(){

    const [showpassword,setshowpassword] = useState(false)

    return(

          <div  className="w-full h-screen bg-cover flex justify-center items-center
           " style={{backgroundImage:`url(${img1})`}} >

  <form className="w-[25%] h-[400px] md:h-[400px] lg:h-[2500px] gap-[60px]
  backdrop-blur bg-[#000000bc] flex flex-col items-center justify-center
   shadow-lg shadow-black rounded-b-4xl px-[40px] mb-[300px]" >
 
     <h1 className="text-white text-[100px] mb-[30px] font-semibold" >Register to
       <span className="text-blue-400 ml-[40px]" >Gemini voice assistant</span></h1>

  <input type="text" placeholder="Enter your Name"  className="w-[95%]  h-[7%] bg-transparent  text-white
   text-[60px] placeholder-gray-300 outline-none border-2 border-white font-semibold rounded-full 
   px-[40px] py-[12px] " />

   <input type="email" placeholder="Enter your Email"  className="w-[95%]  h-[7%] bg-transparent  text-white
   text-[60px] placeholder-gray-300 outline-none border-2 border-white font-semibold rounded-full 
   px-[40px] py-[12px] " />

   <div className="w-[95%]  h-[7%] bg-transparent  text-white text-[60px]
   border-2 border-white rounded-full relative " >

   <input type={showpassword? "text":"password"} placeholder="Enter your password"  className=" placeholder-gray-300 outline-none
    bg-transparent w-full h-full px-[40px] py-[12px]  placeholder-gray-300 font-semibold" /> 

    {!showpassword && <IoIosEye className="absolute top-[1px] right-[50px]  text-white h-[190px] "
     onClick={()=>setshowpassword(true)} />}

       {showpassword && <IoIosEyeOff  className="absolute top-[1px] right-[50px]  text-white h-[190px] "
     onClick={()=>setshowpassword(false)} />}
  
   </div>
    


         </form>
 
           

          </div>

    )



 }

 export default Signup
 



 import React from 'react'
 
 function Customize2() {

    

   return (
     <div className='w-full h-[100vh] bg-gradient-to-t from-[black] to-[#0b0250] 
     flex justify-center items-center flex-col'>
       
     <h1 className='text-white text-[100px] mb-[60px] text-center'>Select your
         <span className=' ml-[32px] text-[#9898e5f4]'>Assistant Name</span></h1>

        <input type="text" placeholder="Enter your Name" 
   className=" max-w-[40%]   w-[95%]  h-[7%] bg-transparent  text-white
   text-[60px] placeholder-gray-300 outline-none border-2
    border-white font-semibold rounded-full 
   px-[40px] py-[12px] " />   

   <button className="max-w-[900px] w-[900px] max-h-[400px] h-[160px] bg-white
       text-[60px] cursor-pointer font-bold rounded-full p-[12px] mt-[50px]" 
        >Finally create your assistant</button>

     </div>
   )
 }
 
 export default Customize2
 
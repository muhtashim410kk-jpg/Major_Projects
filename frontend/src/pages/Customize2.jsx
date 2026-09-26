
 import React, { useContext, useState } from 'react'
import { userdatacontext } from '../context/Usercontext'
import axios from 'axios'
import { IoArrowBackOutline } from "react-icons/io5";
import { Navigate, useNavigate } from 'react-router-dom';
 
 function Customize2() {
    
    
    const {userdata,selectedImage,backendImage,serverUrl,setuserdata} = useContext(userdatacontext)
    const [loading,setloading] = useState(false)
    const [asssistantName,setassistantName] = useState(userdata?.AsssistantName || "")
    const navigate = useNavigate()

     async function handleUpdateAssistant(){
          setloading(true)

       try {
             

          let formData = new FormData()
          formData.append("assistantName",asssistantName)

          if(backendImage){
             formData.append("assistantImage",backendImage)
          }else{
            formData.append("imageUrl",selectedImage)
          }

      const result = await axios.post(`${serverUrl}/api/user/update`,formData,{withCredentials:true})
     
      setloading(false)
      console.log(result.data);
      setuserdata(result.data)
      
      
        
       } catch (error) {
           console.log(error);
           
       }

     }

   return (
                 
       
     <div className='w-full h-[100vh] bg-gradient-to-t from-[black] to-[#0b0250] 
     flex justify-center items-center flex-col relative'>
       
    <IoArrowBackOutline className='text-white w-[90px] h-[90px] absolute top-[70px] left-[100px]
     cursor-pointer'  onClick={()=>navigate('/customize')} />
       
     <h1 className='text-white text-[100px] mb-[60px] text-center'>Select your
         <span className=' ml-[32px] text-[#9898e5f4]'>Assistant Name</span></h1>

        <input type="text" placeholder="eg Shifra" 
   className=" max-w-[40%]   w-[95%]  h-[7%] bg-transparent  text-white
   text-[60px] placeholder-gray-300 outline-none border-2
    border-white font-semibold rounded-full 
   px-[40px] py-[12px]  " required onChange={(e)=>setassistantName(e.target.value)} value={asssistantName} />   

  {asssistantName && <button className="max-w-[900px] w-[900px] max-h-[400px] h-[160px] bg-white
       text-[60px] cursor-pointer font-bold rounded-full p-[12px] mt-[50px]" 
       onClick={()=>{
       handleUpdateAssistant()
       navigate('/')

        } }>
        { loading? "Loading...." : "Finally create your assistant"}</button> }
        

  
     </div>
   )
 }
 
 export default Customize2
 
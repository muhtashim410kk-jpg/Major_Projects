import React, { use, useContext, useState }  from "react";
import img1 from '../assets/robotbackground.jpg'
import { IoIosEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";
import {useNavigate}  from 'react-router-dom'
import { userdatacontext } from "../context/Usercontext";
import axios from 'axios'

 function Signin(){
 
    const {serverUrl} = useContext(userdatacontext)
    const navigate = useNavigate()
    const [showpassword,setshowpassword] = useState(false)
   
    const [email,setEmail] = useState("")
    const [password,setPasssword] = useState("")
    const [error,seterror] = useState("")


    async function handleSignin(e){
       
      e.preventDefault()
      seterror("")

     try {
       let result = await axios.post( `${serverUrl}/api/auth/signin`,{

         email,password

       }, {withCredentials:true} )

       console.log(result.data);
       
     } catch (error) {
         console.log(error);
         seterror(error.response.data.message)
         
     }

    }

    return(

    <div  className="w-full h-screen bg-cover flex justify-center items-center "
      style={{backgroundImage:`url(${img1})`}} >

  <form className="w-[25%] h-[400px] md:h-[200px] lg:h-[2500px] gap-[60px]
  backdrop-blur bg-[#000000bc] flex flex-col items-center justify-center
   shadow-lg shadow-black rounded-b-4xl px-[40px] mb-[300px]" onSubmit={handleSignin} >
 
    <h1 className="text-white text-[100px] mb-[30px] font-semibold" >Sign In to
     <span className="text-blue-400 ml-[40px]" >Gemini voice assistant</span></h1>


   <input type="email" placeholder="Enter your Email" 
    className="w-[95%]  h-[7%] bg-transparent  text-white
   text-[60px] placeholder-gray-300 outline-none border-2
    border-white font-semibold rounded-full 
   px-[40px] py-[12px] "  onChange={(e)=>setEmail(e.target.value)} value={email} />

   <div className="w-[95%]  h-[7%] bg-transparent  text-white text-[60px]
   border-2 border-white rounded-full relative " >

   <input type={showpassword? "text":"password"} placeholder="Enter your password" 
    className=" placeholder-gray-300 outline-none   placeholder-gray-300
    bg-transparent w-full h-full px-[40px] py-[12px]   font-semibold" 
     onChange={(e)=>setPasssword(e.target.value)} value={password} /> 
     

    {!showpassword && <IoIosEye className="absolute top-[1px] right-[50px] 
    cursor-pointer  text-white h-[190px] "
     onClick={()=>setshowpassword(true)} />}

       {showpassword && <IoIosEyeOff  className="absolute top-[1px]
        right-[50px] cursor-pointer  text-white h-[190px] " 
        onClick={()=>setshowpassword(false)} />}
         
    

   </div>

      {error.length>0 && <p className="text-red-400 text-[60px]" >{error}</p>}
       <button className="max-w-[400px] w-[400px] max-h-[400px] h-[160px] bg-white
       text-[60px] cursor-pointer font-bold rounded-full p-[12px] mt-[50px]"  >Sign In</button>
    
     <p className="text-white text-[60px]">Want to create a new account ?<span className="text-blue-400
      font-semibold cursor-pointer ml-[12px]" onClick={()=>navigate('/signup')} >Sign Up</span></p>

         </form>
 
           

          </div>

    )



 }

 export default Signin
 


import React from 'react'
import { useContext } from 'react'
import { userdatacontext } from '../context/Usercontext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


function Home() {
   
      const {userdata,serverUrl,setuserdata} = useContext(userdatacontext)
      const navigate = useNavigate()

      async function handleLogout(){
 
        try {
            const result = await axios.get(`${serverUrl}/api/auth/logout`,{withCredentials:true})
            navigate('/signin')
            setuserdata(null)
        } catch (error) {
          setuserdata(null)
          console.log(error);
          
        }

      }


  return (
    <div className='w-full h-[100vh] bg-gradient-to-t from-[black] to-[#0b0250] 
     flex justify-center items-center flex-col gap-[40px] relative'>

          <button className="max-w-[400px] w-[400px] max-h-[400px] h-[160px] bg-white
       text-[60px] cursor-pointer font-bold rounded-full p-[12px] mt-[50px] absolute
       top-[20px] right-[20px]" onClick={()=>handleLogout()} >Logout</button>


        <button className="max-w-[900px] w-[900px] max-h-[400px] h-[160px] bg-white
       text-[60px] cursor-pointer font-bold rounded-full p-[12px] mt-[50px] absolute
       top-[300px] right-[20px]" onClick={()=>navigate('/customize')} >Customize your Assistant</button> 
        

      <div className='w-[15vw] h-[30vh] rounded-4xl flex justify-center items-center overflow-hidden shadow-2xl'>
         
         <img src={userdata?.assistantImage} className='object-cover h-full rounded-4xl' />
         

        </div>   
                 <h1 className='text-white text-[100px] font-semibold'>I'm {userdata?.assistantName}</h1>
    </div>
  )
}

export default Home

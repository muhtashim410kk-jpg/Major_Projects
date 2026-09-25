import React, { createContext } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'

 export  const userdatacontext = createContext()

function Usercontext({children}) {

 const serverUrl = "http://localhost:7000"
const  [userdata,setuserdata] =useState(null)
  const [frontendImage,setfrontendImage] = useState(null)
    const [backendImage,setbackendImage] = useState(null)
    const [selectedImage,setselectedImage] = useState(null)

    async function handleCurrentUser() {
      
      try {
        
         const result  = await axios.get(`${serverUrl}/api/user/current`,{withCredentials:true})
       console.log(result.data);
       setuserdata(result.data)

      } catch (error) {

        console.log(error);
                
      }
       
    }

    useEffect(()=>{
 
      handleCurrentUser()

    },[])

  const value ={
    serverUrl,userdata,setuserdata,frontendImage,setfrontendImage,backendImage,setbackendImage,
    selectedImage,setselectedImage
  }

  return (
    <div>

      <userdatacontext.Provider value={value}>
      
      {children}

      </userdatacontext.Provider>
     


    </div>
  )
}

export default Usercontext

import React, { createContext } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'

 export  const userdatacontext = createContext()

function Usercontext({children}) {

 const serverUrl = "https://geminivoiceassistant.onrender.com"
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

    async function geminiResponse(command){

      try {

        const result = await axios.post(`${serverUrl}/api/user/asktoassistant`,{command},
          {withCredentials:true})
               
        return result.data
      } catch (error) {
  console.log(error)

  return {
    type: "general",
    userInput: "",
    response: "I am temporarily unavailable. Please try again later."
  }
}

    }

    useEffect(()=>{
 
      handleCurrentUser()

    },[])

  const value ={
    serverUrl,userdata,setuserdata,frontendImage,setfrontendImage,backendImage,setbackendImage,
    selectedImage,setselectedImage,geminiResponse
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

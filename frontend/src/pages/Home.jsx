import React, { useEffect, useRef, useState } from 'react'
import { useContext } from 'react'
import { userdatacontext } from '../context/Usercontext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import aiImg from '..//assets/ai.gif'
import userImg from '..//assets/user4.gif'
import { TfiAlignRight } from "react-icons/tfi";
import { RxCross1 } from "react-icons/rx";
import { AiOutlineSetting } from "react-icons/ai";

function Home() {

  const { userdata, serverUrl, setuserdata, geminiResponse } =
    useContext(userdatacontext)

  const navigate = useNavigate()
  const [listening,setlistening] = useState(false)
  const [usertext,setusertext] = useState("")
  const [aitext,setaitext] = useState("")
  const [hamburger,sethamburger] = useState(false)
  const isSpeakingRef = useRef(false)  
  const recognitionRef = useRef(null) 
  const synth = window.speechSynthesis 
 

  async function handleLogout() {
    try {
      const result = await axios.get(
        `${serverUrl}/api/auth/logout`,
        { withCredentials: true }
      )

      navigate('/signin')
      setuserdata(null)

    } catch (error) {
      setuserdata(null)
      console.log(error)
    }
  }

  const startRecoginition = ()=>{
   
 try {
          recognitionRef.current?.start();
          setlistening(true)

  
 } catch (error) {
    if(!error.message.includes("start")){
      console.error("Recoginition error",error);
    }
 }

  };

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text)
    isSpeakingRef.current = true
    utterance.onend=()=>{
      setaitext("")
      isSpeakingRef.current = false
      startRecoginition()
    }
    synth.speak(utterance)
  }


  const handleSimpleCommand = (transcript) => {

    const command = transcript.toLowerCase()


    // TIME
    if (
      command.includes("what time") ||
      command.includes("current time") ||
      command.includes("tell me the time") ||
      command.includes("tell the time") ||
      command.includes("jarvis btao time kia ho raha ha")||
      command.includes("jarvis btao time kia hoa ha")||
      command.includes("jarvis current time btao")||
      command.includes("jarvis time btao")||
      command.includes("jarvis time kia ho raha ha")

    ) {

      const time = new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
      })

      speak(`The current time is ${time}`)

      return true
    }


    // DATE
    if (
      command.includes("today's date") ||
      command.includes("todays date") ||
      command.includes("what date") ||
      command.includes("current date") ||
      command.includes("tell me the date") ||
      command.includes("tell the date") ||
      command.includes("tell date")||
      command.includes("aj kia date ha")||
      command.includes("date kia ha")||
      command.includes("tareekh kia ha")||
      command.includes("aj ki date btao")


    ) {

      const date = new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
      })

      speak(`Today's date is ${date}`)

      return true
    }


    // DAY
    if (
      command.includes("what day") ||
      command.includes("which day") ||
      command.includes("today's day") ||
      command.includes("todays day") ||
      command.includes("tell me the day") 
    ) {

      const day = new Date().toLocaleDateString("en-US", {
        weekday: "long"
      })

      speak(`Today is ${day}`)

      return true
    }


    // MONTH
    if (
      command.includes("what month") ||
      command.includes("which month") ||
      command.includes("current month") ||
      command.includes("tell me the month")
    ) {

      const month = new Date().toLocaleDateString("en-US", {
        month: "long"
      })

      speak(`The current month is ${month}`)

      return true
    }


    // Nothing matched
    return false
  }


  const handleCommand = (data) => {

    const { type, userInput, response } = data

    speak(response)


    if (type === 'google_search') {

      const query = encodeURIComponent(userInput)

      const url = `https://www.google.com/search?q=${query}`

      console.log("Google URL:", url)

      window.open(url, "_blank")
    }


    if (type === 'calculator_open') {

      const url = `https://www.google.com/search?q=calculator`

      console.log("Calculator URL:", url)

      window.open(url, "_blank")
    }


    if (type === 'instagram_open') {

      const url = `https://www.instagram.com/`

      console.log("Instagram URL:", url)

      window.open(url, "_blank")
    }


    if (type === 'facebook_open') {

      const url = `https://www.facebook.com/`

      console.log("Facebook URL:", url)

      window.open(url, "_blank")
    }


    if (type === 'weather_show') {

      const url = `https://www.google.com/search?q=weather`

      console.log("Weather URL:", url)

      window.open(url, "_blank")
    }


    if (
      type === 'youtube_search' ||
      type === 'youtube_play'
    ) {

      const query = encodeURIComponent(userInput)

      const url =
        `https://www.youtube.com/results?search_query=${query}`

      console.log("YouTube URL:", url)

      window.open(url, "_blank")
    }
  }


  useEffect(() => {

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition

    if (!SpeechRecognition) {
      console.log(
        "Speech Recognition is not supported in this browser"
      )
      return
    }

    const recognition = new SpeechRecognition()

    recognition.continuous = true
    recognition.lang = "en-US"

    recognitionRef.current = recognition

    const isRecoginizingRef = {current:false} 

     function safeRecoginition(){
          
          if(!isSpeakingRef.current && !isRecoginizingRef.current)

        try {
                  recognition.start();
                                 
                  
        } catch (error) {
             if(error.name!== "InvalidStateError"){
              console.error("Start Error:",error);
              
             }
        }

     }

     recognition.onstart = ()=>{
      
      isRecoginizingRef.current = true;
      setlistening(true);
      
     };

     recognition.onend = ()=>{
      
      isRecoginizingRef.current = false
      setlistening(false)
       
       if(!isSpeakingRef.current){
      setTimeout(() => {
          safeRecoginition()
      }, 1000); //delay avoid rapid loop
     }

     };

       recognition.onerror = (event)=>{
      
      isRecoginizingRef.current = false
      setlistening(false);
      if(event.error!== "aborted" && !isSpeakingRef.current){
        setTimeout(() => {
           safeRecoginition();
        }, 1000);
      }
       
      

     };

    

    recognition.onresult = async (e) => {

      const transcript =
        e.results[e.results.length - 1][0].transcript.trim()

        setusertext(transcript)
        setaitext("")

      console.log("heard :" + transcript)


 if ( userdata?.assistantName &&  transcript.toLowerCase().includes(userdata.assistantName.toLowerCase()) ){  
         
       recognition.stop()
       isRecoginizingRef.current = false
       setlistening(false)

        const simpleCommandHandled =
          handleSimpleCommand(transcript)

        if (simpleCommandHandled) {
          return
        }

        const data = await geminiResponse(transcript)
        if(data.history){
          setuserdata(prev =>({
            ...prev,
            history:data.history
          }))
        }

        console.log(data)

        if (!data) {
          return
        }

        handleCommand(data)
        setaitext(data.response)
        setusertext("")
      }
    }

const fallback = setInterval(() => {

  if(!isSpeakingRef.current && !isRecoginizingRef.current){
    safeRecoginition()
  }
  
}, 10000);

safeRecoginition()

   return ()=>{
      recognition.stop()        
      setlistening(false)
      isRecoginizingRef.current = false
      clearInterval(fallback)

   }

   

  }, [])


  return (
    <div className='w-full h-[100vh] bg-gradient-to-t from-[black] to-[#090241]
     flex justify-center items-center flex-col gap-[40px] relative overflow-x-hidden'>

     <TfiAlignRight className=' text-white absolute  w-[40px] h-[40px]
     top-[70px] left-[70px] cursor-pointer' onClick={()=>sethamburger(true)} />
     


     <div className={`fixed inset-0 z-50 bg-[#00000025] 
      backdrop-blur-lg  p-[20px] flex flex-col overflow-x-hidden
       gap-[20px] items-start ${hamburger?"translate-x-0 ":"translate-x-full " }`} >

         <RxCross1 className=' text-white absolute  w-[25px] h-[25px]
     top-[20px] right-[20px] cursor-pointer  ' onClick={()=>sethamburger(false)} />



       <button
        className="max-w-[400px] w-[400px] max-h-[200px] h-[60px] bg-white
        text-[30px] cursor-pointer font-bold rounded-full p-[12px] 
         top-[300px] right-[20px]  "
        onClick={() => navigate('/customize')}
      >
        Customize your Assistant
      </button>

          <button
        className="max-w-[200px] w-[200px] max-h-[200px] h-[60px] bg-white
        text-[30px] cursor-pointer font-bold rounded-full p-[12px] 
         top-[200px] right-[80px]  "
        onClick={() => handleLogout()}
      >
        Logout
      </button>


      

      <div className='w-full h-[2px] bg-gray-400'> </div>
  
      <h1 className='text-white text-[50px] font-semibold'>History</h1>

      <div className='w-full h-[60%] overflow-auto flex flex-col gap-[20px]'>
        {userdata.history?.map((his,index)=>( 
             <span key={index} className='text-white text-[30px] truncate'>{his}</span>

       ))}

      </div>

     </div>


     


      <div className='w-[10vw] h-[20vh] rounded-4xl flex justify-center items-center overflow-hidden shadow-2xl'>

        <img
          src={userdata?.assistantImage}
          className='object-cover h-full rounded-4xl'
        />

      </div>


      <h1 className='text-white text-[60px] font-semibold'>
        I'm {userdata?.assistantName}
      </h1>
      {!aitext && <img src={userImg} className='w-[200px]' />}
      {aitext && <img src={aiImg} className='w-[200px] h-[200px]'  ></img>}
             
      <h1 className='text-white font-semibold text-[40px]'>{usertext?usertext:aitext?aitext:null}</h1>

    </div>
  )
}

export default Home
import React, { useEffect, useRef, useState } from 'react'
import { useContext } from 'react'
import { userdatacontext } from '../context/Usercontext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import aiImg from '..//assets/ai.gif'
import userImg from '..//assets/user4.gif'
import { TfiAlignRight } from "react-icons/tfi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { RxCross1 } from "react-icons/rx";


function Home() {

  const { userdata, serverUrl, setuserdata } =
    useContext(userdatacontext)

  const navigate = useNavigate()
  const [listening, setlistening] = useState(false)
  const [usertext, setusertext] = useState("")
  const [aitext, setaitext] = useState("")
 const [hamburger, sethamburger] = useState(false)
const [selectedChatId, setSelectedChatId] = useState(null)
const selectedChatIdRef = useRef(null)

const selectedChat = userdata?.chats?.find(
  chat => chat._id === selectedChatId
)

useEffect(() => {
  if (!selectedChatId && userdata?.chats?.length > 0) {
    const latestChat = userdata.chats[userdata.chats.length - 1];

    setSelectedChatId(latestChat._id);
    selectedChatIdRef.current = latestChat._id;
  }
}, [userdata?.chats, selectedChatId]);

const isSpeakingRef = useRef(false) 
  const recognitionRef = useRef(null)
  const isRecoginizingRef = useRef(false)
  const synth = window.speechSynthesis



async function handleNewChat() {
  try {
    const result = await axios.post(
      `${serverUrl}/api/user/new-chat`,
      {},
      { withCredentials: true }
    );

    setuserdata(prev => ({
      ...prev,
      chats: result.data.chats
    }));

    setSelectedChatId(result.data.chat._id);
   
selectedChatIdRef.current = result.data.chat._id;
    setusertext("");
    setaitext("");
    sethamburger(false);

  } catch (error) {
    console.log("New chat error:", error);
  }
}




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


  const startRecoginition = () => {

    if (!isSpeakingRef.current && !isRecoginizingRef.current) {

      try {
        recognitionRef.current?.start();
        console.log("Recoginition requested to start");

      } catch (error) {
        if (error.name !== "InvalidStateError") {
          console.error("Start error :", error);
        }
      }

    }

  };


  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text)
    isSpeakingRef.current = true

    utterance.onend = () => {
      setaitext("")
      isSpeakingRef.current = false;

      setTimeout(() => {
        startRecoginition()
      }, 800);

    }

    synth.cancel();
    synth.speak(utterance);
  }


  const handleSimpleCommand = (transcript) => {

    const command = transcript.toLowerCase()


    // TIME
    if (
      command.includes("what time") ||
      command.includes("current time") ||
      command.includes("tell me the time") ||
      command.includes("tell the time") ||
      command.includes("jarvis btao time kia ho raha ha") ||
      command.includes("jarvis btao time kia hoa ha") ||
      command.includes("jarvis current time btao") ||
      command.includes("jarvis time btao") ||
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
      command.includes("tell date") ||
      command.includes("aj kia date ha") ||
      command.includes("date kia ha") ||
      command.includes("tareekh kia ha") ||
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
    console.log("Speech Recognition is not supported in this browser")
    return
  }

  const recognition = new SpeechRecognition()

  recognition.continuous = true
  recognition.lang = "en-US"
  recognition.interimResults = false

  recognitionRef.current = recognition

  let isMounted = true

  const startTimeout = setTimeout(() => {

    if ( isMounted &&  !isSpeakingRef.current && !isRecoginizingRef.current ) {

      try {
        recognition.start()
        

      } catch (error) {

        if (error.name !== "InvalidStateError") {
          console.error("Start error:", error)
        }

      }
    }

  }, 1000)


  recognition.onstart = () => {

    isRecoginizingRef.current = true
    setlistening(true)
  

  }


  recognition.onend = () => {

    isRecoginizingRef.current = false
    setlistening(false)

    if (isMounted && !isSpeakingRef.current) {

      setTimeout(() => {

        if (isMounted) {

          try {

            recognition.start()
            

          } catch (error) {

            if (error.name !== "InvalidStateError") {
              console.error("Restart error:", error)
            }

          }

        }

      }, 1000)

    }

  }


  recognition.onerror = (event) => {

    if (event.error !== "no-speech") {
        console.warn("Recognition error:", event.error)
    }

    isRecoginizingRef.current = false
    setlistening(false)
}


  recognition.onresult = async (e) => {

    const transcript = e.results[e.results.length - 1][0].transcript.trim()

    // Show question immediately
    setusertext(transcript)
  
    // SIMPLE COMMANDS
   
    const simpleCommandHandled =
      handleSimpleCommand(transcript)

    if (simpleCommandHandled) {

      recognition.stop()
      isRecoginizingRef.current = false
      setlistening(false)

      return
    }

    // ASSISTANT NAME CHECK

    const containsAssistantName =transcript.toLowerCase().includes(userdata?.assistantName?.toLowerCase())

    if (containsAssistantName) {

      console.log("7. Calling Gemini...")

      recognition.stop()
      isRecoginizingRef.current = false
      setlistening(false)

  if (!selectedChatIdRef.current) {
  console.log("Please click New Chat first");
  return;
}

const result = await axios.post(
  `${serverUrl}/api/user/asktoassistant`,
  {
    command: transcript,
    chatId: selectedChatIdRef.current
  },
  { withCredentials: true }
);

const data = result.data;

setuserdata(prev => ({
  ...prev,
  chats: data.chats
}));

      console.log("8. Gemini returned:", data)

      if (!data) {
        return
      }

      // Update history
     

      handleCommand(data)
      setaitext(data.response)
      setusertext("")

    } else {

      console.log(
        "7. Gemini NOT called because assistant name was not detected"
      )

    }

  };

  const greeting = new SpeechSynthesisUtterance(`Hey ${userdata.name},How can I help you !`);
  greeting.lang ='hi-IN';
  window.speechSynthesis.speak(greeting);


  return () => {

    isMounted = false

    clearTimeout(startTimeout)

    recognition.stop()

    setlistening(false)

    isRecoginizingRef.current = false

    

  }

}, [])


  return (
    <div className="w-full min-h-screen bg-gradient-to-t from-black to-[#050127]
  flex flex-col items-center gap-6 sm:gap-8
  relative overflow-x-hidden px-4 py-8 ">

      {/* Hamburger */}
      <TfiAlignRight className='text-white fixed  w-[30px] h-[30px]
        sm:w-[35px] sm:h-[35px] md:w-[40px] md:h-[40px] top-[25px] left-[25px]
        sm:top-[40px] sm:left-[40px] md:top-[70px] md:left-[70px] cursor-pointer z-40'
        onClick={() => sethamburger(true)}  />

      {/* Sidebar / History */}
      <div className={`fixed inset-0 z-50 bg-[#00000025] backdrop-blur-lg p-[20px]
        sm:p-[30px] md:p-[40px] flex flex-col transition-transform duration-300
        gap-[20px] items-start  overflow-hidden  ${hamburger ? "translate-x-0" : "translate-x-full"}`} >

        <RxCross1  className='text-white absolute w-[22px] h-[22px]  sm:w-[25px] sm:h-[25px]
          top-[20px] right-[20px] sm:top-[30px] sm:right-[30px] cursor-pointer'
          onClick={() => sethamburger(false)}  />

        {/* Customize Button */}
        <button className='w-full  max-w-[400px] h-[50px]  sm:h-[55px]  md:h-[60px]
          bg-white text-[17px] sm:text-[22px] md:text-[30px]  cursor-pointer  font-bold
          rounded-full  px-4  py-2  mt-[45px]' onClick={() => navigate('/customize')}  >
          Customize your Assistant
        </button>

        {/* Logout Button */}
        <button  className='w-full max-w-[200px]  h-[50px]  sm:h-[55px]  md:h-[60px]  bg-white
          text-[17px]  sm:text-[22px]  md:text-[30px]  cursor-pointer  font-bold  rounded-full
          px-4 py-2' onClick={() => handleLogout()} >
          Logout
        </button>


        <div className='w-full h-[2px] bg-gray-400 mt-[5px]' />


        <h1 className='text-white text-[28px] sm:text-[38px] md:text-[50px] font-semibold' >
          History
        </h1>



        <button
  onClick={handleNewChat}
  className="w-full max-w-[400px] rounded-full bg-blue-600 text-white p-3 font-semibold"
>
  + New Chat
</button>



        <div className='w-full flex-1  flex flex-col gap-[15px] sm:gap-[20px]
          min-h-0 overflow-y-auto overflow-x-hidden ' >
        
{userdata.chats?.map(chat => (
  <div key={chat._id} className="w-full flex items-center gap-2">

    <span
      onClick={() => {
        setSelectedChatId(chat._id);
        selectedChatIdRef.current = chat._id;
        sethamburger(false);
        setusertext("");
        setaitext("");
      }}
      className="flex-1 min-w-0 text-white text-[18px] sm:text-[24px] md:text-[30px] break-words cursor-pointer hover:text-blue-300"
    >
      {chat.title}
    </span>

    <RiDeleteBin6Line
      className="text-white cursor-pointer shrink-0 hover:text-red-400"
      onClick={async () => {
        try {
          const result = await axios.delete(
            `${serverUrl}/api/user/delete-chat/${chat._id}`,
            { withCredentials: true }
          );

          setuserdata(prev => ({
            ...prev,
            chats: result.data.chats
          }));

          if (selectedChatId === chat._id) {
            setSelectedChatId(null);
            selectedChatIdRef.current = null;
            setusertext("");
            setaitext("");
          }
        } catch (error) {
          console.log("Delete chat error:", error);
        }
      }}
    />

  </div>
))}

        </div>

      </div>


      {/* Assistant Image */}
      <div
        className='
        w-[110px] h-[110px] sm:w-[140px] sm:h-[140px] max-w-[220px] max-h-[220px] rounded-4xl
        md:w-[170px] md:h-[170px] lg:w-[10vw] lg:h-[20vh] mt-25
          flex justify-center items-center overflow-hidden shadow-2xl'>    
        <img
          src={userdata?.assistantImage}
          className='object-cover w-full h-full rounded-4xl'  />
        
      </div>

      {/* Assistant Name */}
      <h1
        className='text-white font-semibold text-center   leading-tight
        text-[30px] sm:text-[40px]  md:text-[50px] lg:text-[60px] '>
      
        I'm {userdata?.assistantName}
                                     </h1>

      {/* User / AI GIF */}
      {!aitext && (
        <img
          src={userImg}
          className='w-[130px] sm:w-[160px] md:w-[200px]'
        />
      )}

      {aitext && (
        <img
          src={aiImg}
          className='w-[130px] h-[130px]
          sm:w-[160px] sm:h-[160px]  md:w-[200px] md:h-[200px]'
        />
      )}


<div className="w-full max-w-3xl flex-1 min-h-0 overflow-y-auto flex flex-col gap-4 px-2 py-4">
  {selectedChat?.messages?.map((message, index) => (
    <div key={index} className="flex flex-col gap-3">

      <div className="self-end max-w-[90%] bg-blue-600 text-white rounded-2xl p-3 break-words">
        <p className="font-semibold text-sm mb-1">You</p>
        {message.question}
      </div>

      <div className="self-start max-w-[90%] bg-white/10 text-white rounded-2xl p-3 break-words">
        <p className="font-semibold text-sm mb-1">Assistant</p>
        {message.response}
      </div>

    </div>
  ))}
</div>

    </div>
  )
}

export default Home
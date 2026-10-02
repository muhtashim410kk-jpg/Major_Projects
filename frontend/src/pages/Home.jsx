import React, { useEffect } from 'react'
import { useContext } from 'react'
import { userdatacontext } from '../context/Usercontext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Home() {

  const { userdata, serverUrl, setuserdata, geminiResponse } =
    useContext(userdatacontext)

  const navigate = useNavigate()

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

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text)
    window.speechSynthesis.speak(utterance)
  }


  const handleSimpleCommand = (transcript) => {

    const command = transcript.toLowerCase()


    // TIME
    if (
      command.includes("what time") ||
      command.includes("current time") ||
      command.includes("tell me the time") ||
      command.includes("tell the time")
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
      command.includes("tell date")
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


    recognition.onresult = async (e) => {

      const transcript =
        e.results[e.results.length - 1][0].transcript.trim()

      console.log("heard :" + transcript)


     if (
  userdata?.assistantName &&
  transcript
    .toLowerCase()
    .includes(userdata.assistantName.toLowerCase())
) {


        const simpleCommandHandled =
          handleSimpleCommand(transcript)

        if (simpleCommandHandled) {
          return
        }

        const data = await geminiResponse(transcript)

        console.log(data)

        if (!data) {
          return
        }

        handleCommand(data)
      }
    }


    recognition.start()


    return () => {
      recognition.stop()
    }

  }, [])


  return (
    <div className='w-full h-[100vh] bg-gradient-to-t from-[black] to-[#0b0250]
     flex justify-center items-center flex-col gap-[40px] relative'>


      <button
        className="max-w-[200px] w-[200px] max-h-[200px] h-[60px] bg-white
        text-[30px] cursor-pointer font-bold rounded-full p-[12px] mt-[50px]
        absolute top-[200px] right-[80px]"
        onClick={() => handleLogout()}
      >
        Logout
      </button>


      <button
        className="max-w-[400px] w-[400px] max-h-[200px] h-[60px] bg-white
        text-[30px] cursor-pointer font-bold rounded-full p-[12px] mt-[50px]
        absolute top-[300px] right-[20px]"
        onClick={() => navigate('/customize')}
      >
        Customize your Assistant
      </button>


      <div className='w-[10vw] h-[20vh] rounded-4xl flex justify-center items-center overflow-hidden shadow-2xl'>

        <img
          src={userdata?.assistantImage}
          className='object-cover h-full rounded-4xl'
        />

      </div>


      <h1 className='text-white text-[60px] font-semibold'>
        I'm {userdata?.assistantName}
      </h1>


    </div>
  )
}

export default Home
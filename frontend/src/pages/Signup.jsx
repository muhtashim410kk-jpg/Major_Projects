import { useContext, useState } from "react";
import img1 from "../assets/robotbackground.jpg";
import { IoIosEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { userdatacontext } from "../context/Usercontext";
import axios from "axios";

function Signup() {
  const { serverUrl, userdata, setuserdata } = useContext(userdatacontext);
  const navigate = useNavigate();

  const [showpassword, setshowpassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setloading] = useState(false);
  const [password, setPasssword] = useState("");
  const [error, seterror] = useState("");

  async function handleSignup(e) {
    e.preventDefault();
    seterror("");
    setloading(true);

    try {
      let result = await axios.post(
        `${serverUrl}/api/auth/signup`,
        { name, email, password },
        { withCredentials: true }
      );

      console.log(result.data);
      setuserdata(result.data);
      setloading(false);
      navigate("/customize");
    } catch (error) {
      console.log(error);
      setuserdata(null);
      setloading(false);
      seterror(error.response.data.message);
    }
  }

  return (
    <div
      className="w-full min-h-screen bg-cover bg-center flex justify-center items-center px-4 py-8"
      style={{ backgroundImage: `url(${img1})` }}
    >
      <form
        className="w-full max-w-[900px] min-h-[700px] md:min-h-[750px]
         gap-[25px] md:gap-[35px] backdrop-blur bg-[#000000bc] flex flex-col
          items-center justify-center shadow-lg shadow-black rounded-b-4xl
           px-5 sm:px-8 md:px-12 py-8 md:py-10" onSubmit={handleSignup}  >


        <h1 className="text-white text-[32px] sm:text-[42px] md:text-[55px]
         lg:text-[70px] mb-[15px] font-semibold text-center leading-tight"> Register to
          <span className="text-blue-400 ml-2 md:ml-5">  Gemini voice assistant </span>
        </h1>


        <input type="text"  placeholder="Enter your Name"
          className="w-full h-[60px] md:h-[70px] bg-transparent text-white 
          text-[20px] sm:text-[24px] md:text-[28px] placeholder-gray-300 outline-none 
          border-2 border-white font-semibold rounded-full px-5 md:px-8 py-3"
          required  onChange={(e) => setName(e.target.value)}  value={name} />


        <input  type="email"  placeholder="Enter your Email"
          className="w-full h-[60px] md:h-[70px] bg-transparent text-white 
          text-[20px] sm:text-[24px] md:text-[28px] placeholder-gray-300
           outline-none border-2 border-white font-semibold rounded-full px-5 md:px-8 py-3"
          onChange={(e) => setEmail(e.target.value)} value={email} />


        <div className="w-full h-[60px] md:h-[70px] bg-transparent text-white 
        text-[20px] sm:text-[24px] md:text-[28px] border-2 border-white rounded-full relative">


      <input  type={showpassword ? "text" : "password"}  placeholder="Enter your password"
            className="placeholder-gray-300 outline-none bg-transparent w-full h-full
             px-5 md:px-8 py-3 pr-[65px] font-semibold"  onChange={(e) => setPasssword(e.target.value)}
            value={password}  />

          {!showpassword && (
            <IoIosEye  className="absolute top-1/2 -translate-y-1/2 right-5 cursor-pointer
             text-white w-[28px] h-[28px] md:w-[35px] md:h-[35px]"  onClick={() => setshowpassword(true)}
            />
          )}

          {showpassword && (
            <IoIosEyeOff   className="absolute top-1/2 -translate-y-1/2 right-5
             cursor-pointer text-white w-[28px] h-[28px] md:w-[35px] md:h-[35px]"
              onClick={() => setshowpassword(false)}
            />
          )}
        </div>

        {error.length > 0 && (
          <p className="text-red-400 text-[18px] md:text-[22px] text-center">
            {error}
          </p>
        )}


        <button
          className="w-full max-w-[300px] h-[60px] md:h-[70px] bg-white text-[22px] 
          md:text-[28px] cursor-pointer font-bold rounded-full p-3 mt-[10px]"
          disabled={loading}
        >


          {loading ? "Loading..." : "Sign up"}
        </button>

        <p className="text-white text-[18px] sm:text-[20px] md:text-[24px] text-center">
          Already have an account ?
          <span
            className="text-blue-400 font-semibold cursor-pointer ml-[12px]"
            onClick={() => navigate("/signin")}
          >
            Sign in
          </span>
        </p>
      </form>
    </div>
  );
}

export default Signup;
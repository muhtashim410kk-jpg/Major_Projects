import { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { userdatacontext } from "../context/Usercontext";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import img1 from "../assets/robotbackground.jpg";
import axios from "axios";

function ResetPassword() {
  const { token } = useParams();
  const { serverUrl } = useContext(userdatacontext);
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [showpassword, setshowpassword] = useState(false);
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState("");

  async function handleReset(e) {
    e.preventDefault();
    seterror("");
    setloading(true);

    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/reset-password/${token}`,
        { password }
      );

      alert(result.data.message);
      navigate("/signin");
    } catch (error) {
      seterror(
        error.response?.data?.message || "Password reset failed"
      );
    } finally {
      setloading(false);
    }
  }

  return (
    <div
      className="w-full min-h-screen bg-cover bg-center
flex justify-center items-center px-3 py-6 overflow-x-hidden"
      style={{ backgroundImage: `url(${img1})` }}
    >
      <form
        onSubmit={handleReset}
        className="box-border w-full max-w-[750px] min-h-[500px]
gap-6 sm:gap-8 md:gap-10 backdrop-blur bg-[#000000bc]
flex flex-col items-center justify-center
shadow-lg shadow-black rounded-3xl
px-5 sm:px-8 md:px-12 py-8 sm:py-10"
      >
        <h1
          className="w-full text-white text-[32px] sm:text-[42px]
md:text-[55px] font-semibold text-center leading-tight"
        >
          Reset Your
          <span className="text-blue-400 ml-2">
            Password
          </span>
        </h1>

        <p className="text-gray-300 text-base sm:text-lg text-center">
          Create a new password for your account.
        </p>

        <div
          className="w-full h-[60px] md:h-[70px]
          bg-transparent text-white text-lg sm:text-xl md:text-2xl
          border-2 border-white rounded-full relative"
        >
          <input
            type={showpassword ? "text" : "password"}
            placeholder="Enter your new password"
            className="placeholder-gray-300 outline-none
            bg-transparent w-full h-full px-5 md:px-8
            py-3 pr-16 font-semibold rounded-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={6}
            required
          />

          {!showpassword ? (
            <IoIosEye
              className="absolute top-1/2 -translate-y-1/2
              right-5 cursor-pointer text-white
              w-7 h-7 md:w-9 md:h-9"
              onClick={() => setshowpassword(true)}
            />
          ) : (
            <IoIosEyeOff
              className="absolute top-1/2 -translate-y-1/2
              right-5 cursor-pointer text-white
              w-7 h-7 md:w-9 md:h-9"
              onClick={() => setshowpassword(false)}
            />
          )}
        </div>

        {error && (
          <p className="text-red-400 text-base sm:text-lg text-center">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full max-w-[300px] min-h-[60px]
          md:min-h-[70px] bg-white text-gray-900
          text-xl md:text-2xl cursor-pointer font-bold
          rounded-full px-5 py-3 transition duration-300
          hover:bg-blue-400 hover:text-white
          disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>

        <p className="text-white text-base sm:text-lg text-center">
          Remember your password?
          <span
            className="text-blue-400 font-semibold cursor-pointer ml-2
            hover:text-blue-300"
            onClick={() => navigate("/signin")}
          >
            Sign in
          </span>
        </p>
      </form>
    </div>
  );
}

export default ResetPassword;
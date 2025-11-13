import { useState } from "react"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { login } from "../../../services/operations/authAPI"

function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false)
  const { email, password } = formData;

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password, navigate))
  }

  return (
    <form
      onSubmit={handleOnSubmit}
      className="mt-6 flex w-full flex-col gap-y-4"
    >
      <label className="w-full">
        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-white/90">
          Email Address <sup className="text-pink-200">*</sup>
        </p>
        <input
          required
          type="text"
          name="email"
          value={email}
          onChange={handleOnChange}
          placeholder="Enter email address"
          className="w-full rounded-[0.5rem] backdrop-blur-md bg-white/10 border border-white/20 p-[12px] text-white placeholder:text-white/50 outline-none focus:ring-2 focus:ring-[#4a9d63] transition-all duration-300"
        />
      </label>
      <label className="relative">
        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-white/90">
          Password <sup className="text-pink-200">*</sup>
        </p>
        <input
          required
          type={showPassword ? "text" : "password"}
          name="password"
          value={password}
          onChange={handleOnChange}
          placeholder="Enter Password"
          className="w-full rounded-[0.5rem] backdrop-blur-md bg-white/10 border border-white/20 p-[12px] pr-12 text-white placeholder:text-white/50 outline-none focus:ring-2 focus:ring-[#4a9d63] transition-all duration-300"
        />
        <span
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 top-[38px] z-[10] cursor-pointer"
        >
          {showPassword ? (
            <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
          ) : (
            <AiOutlineEye fontSize={24} fill="#AFB2BF" />
          )}
        </span>
        <Link to="/forgot-password">
          <p className="mt-1 ml-auto max-w-max text-xs text-[#6dd192] hover:text-[#4a9d63] transition-colors duration-300">
            Forgot Password
          </p>
        </Link>
      </label>
      <button
        type="submit"
        className="mt-6 w-full rounded-lg bg-gradient-to-r from-[#4a9d63] to-[#3d7c52] px-6 py-3 text-center text-sm font-bold text-white shadow-lg shadow-[#4a9d63]/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[#4a9d63]/70 focus:outline-none focus:ring-2 focus:ring-[#4a9d63] focus:ring-offset-2"
      >
        Sign In
      </button>
    </form>
  )
}

export default LoginForm

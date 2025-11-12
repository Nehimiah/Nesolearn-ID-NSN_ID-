import LoginForm from "./LoginForm"
import SignupForm from "./SignupForm"
import Img from './../../common/Img';

function Template({ title, description1, description2, image, formType }) {
  return (
    <div className="relative grid min-h-[calc(100vh-3.5rem)] place-items-center overflow-hidden">
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#3d7c52] via-[#2d5c3f] to-[#1d3d2a] animate-gradient-shift"></div>
      
      {/* Floating Orbs for Depth */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-[#4a9d63] rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-40 right-20 w-72 h-72 bg-[#5bb377] rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-[#3d8c56] rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

      <div className="relative mx-auto flex w-11/12 max-w-maxContent flex-col-reverse justify-between gap-y-12 py-12 md:flex-row md:gap-y-0 md:gap-x-12 z-10">
        
        {/* Form Section with Glassmorphism */}
        <div className="mx-auto w-11/12 max-w-[450px] md:mx-0 transform transition-all duration-500 hover:scale-[1.02]">
          <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl">
            <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-white drop-shadow-lg">
              {title}
            </h1>
            <p className="mt-4 text-[1.125rem] leading-[1.625rem]">
              <span className="text-white/90">{description1}</span>{" "}
              <span className="font-edu-sa font-bold italic text-[#6dd192] drop-shadow-md">
                {description2}
              </span>
            </p>
            {formType === "signup" ? <SignupForm /> : <LoginForm />}
          </div>
        </div>

        {/* Image Section with 3D Effect */}
        <div className="relative max-w-[550px] md:mx-0 my-0 transform transition-all duration-500 hover:scale-[1.05] hover:rotate-1 perspective-1000">
          <div className="absolute inset-0 bg-gradient-to-br from-[#4a9d63]/30 to-[#3d7c52]/30 rounded-3xl blur-2xl transform translate-y-4"></div>
          <div className="relative backdrop-blur-md bg-white/5 border border-white/20 rounded-3xl p-2 shadow-2xl transform hover:shadow-[#4a9d63]/50">
            <Img
              src={image}
              alt={formType}
              className="w-full h-full object-cover rounded-2xl shadow-xl"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Template

import React, { useState } from "react";
import { useSelector } from "react-redux";
import {Link} from 'react-router-dom'

const Hero = () => {
  const [menuOpen, setMenuOpen] = useState(false);


  const user = useSelector(state => state.auth)

  return (
    <section className="relative flex flex-col items-center text-white text-sm overflow-hidden  min-h-screen bg-black">
      
      <svg
        className="absolute inset-0 -z-10 w-full h-full"
        viewBox="0 0 1440 676"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="-92"
          y="-948"
          width="1624"
          height="1624"
          rx="812"
          fill="url(#a)"
        />
        <defs>
          <radialGradient
            id="a"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="rotate(90 428 292) scale(812)"
          >
            <stop offset=".63" stopColor="#372AAC" stopOpacity="0" />
            <stop offset="1" stopColor="#372AAC" />
          </radialGradient>
        </defs>
      </svg>

      {/* Navbar */}
      <nav className="z-50 flex items-center justify-between w-full py-4 px-6 md:px-16 lg:px-24 xl:px-32 backdrop-blur">
        <a href="#" className="text-lg font-semibold">
          ResumeBuilder
        </a>

        <div className="hidden md:flex items-center gap-8">
          {["Features", "Resume Templates","Reviews", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="hover:text-slate-300 transition"
            >
              {item}
            </a>
          ))}
        </div>

        <div className="hidden md:block space-x-3">

          <Link to= "/app?state=login" className="hover:bg-slate-300/20 transition px-6 py-2 border border-slate-400 rounded-md" hidden = {user}>
            Login
          </Link>
          <Link to='/app' className="hover:bg-slate-300/20 transition px-6 py-2 border border-slate-400 rounded-md" >
            Dashboard
          </Link>
        </div>

        {/* Mobile menu icon */}
        <button
          onClick={() => setMenuOpen(true)}
          className="md:hidden active:scale-90 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 5h16" />
            <path d="M4 12h16" />
            <path d="M4 19h16" />
          </svg>
        </button>
      </nav>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 z-[100] bg-black/60 backdrop-blur flex flex-col items-center justify-center text-lg gap-8 md:hidden transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {["Features", "Cover Letter", "Resume Templates", "Contact"].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            onClick={() => setMenuOpen(false)}
          >
            {item}
          </a>
        ))}
        <button
          onClick={() => setMenuOpen(false)}
          className="active:ring-3 active:ring-white aspect-square size-10 p-1 flex items-center justify-center bg-slate-100 hover:bg-slate-200 transition text-black rounded-md"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>
      </div>

      {/* Hero content */}
      <div className="flex items-center mt-32 gap-2 border border-slate-600 text-gray-50 rounded-full px-4 py-2">
        <div className="size-2.5 bg-green-500 rounded-full" />
        <span></span>
      </div>

      <h1 className="text-center text-5xl leading-[68px] md:text-6xl md:leading-[70px] mt-4 font-semibold max-w-2xl">
        Ace your interviews with our ATS friendly Resume
      </h1>

      <p className="text-center text-base max-w-lg mt-2">
        Our platform helps you build job winning resume — so you can
        focus on what matters.
      </p>

      <div className="flex items-center gap-4 mt-8">
        <Link to="/app?state=register" className="flex items-center gap-2 bg-indigo-700 hover:bg-indigo-700 text-white active:scale-95 rounded-lg px-7 h-11">
          Build Your Resume
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.166 10h11.667m0 0L9.999 4.165m5.834 5.833-5.834 5.834"
              stroke="#fff"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
        <button className="border border-slate-400 active:scale-95 hover:bg-white/10 transition rounded-lg px-8 h-11">
          Book a demo
        </button>
      </div>
    </section>
  );
};

export default Hero;
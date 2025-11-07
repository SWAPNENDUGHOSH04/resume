import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Link, useNavigate} from 'react-router-dom';

const Navbar = () => {
    const dispatch = useDispatch()
    const {user} = useSelector(state => state.auth)
    const navigate = useNavigate()
    const logoutUser =()=>{
        navigate('/')
        useDispatch(logoutUser())
    }
  return (
   <div className="shadow bg-[#372AAC] text-white">
  <nav className="flex items-center justify-between max-w-7xl mx-auto px-4 py-3.5 transition-all">
    {/* Logo */}
    <Link to="/" className="flex items-center gap-2 hover:opacity-90 transition">
      <span className="font-semibold text-lg tracking-wide">ResumeBuilder</span>
    </Link>

    {/* Right section */}
    <div className="flex items-center gap-4 text-sm">
      <p className="max-sm:hidden text-indigo-100">
        Hi, <span className="font-medium text-white">{user?.name}</span>
      </p>

      <button
        onClick={logoutUser}
        className="hover:bg-slate-300/20 transition px-6 py-2 border border-slate-400 rounded-md">
        Logout
      </button>
    </div>
  </nav>
</div>

  )
}

export default Navbar
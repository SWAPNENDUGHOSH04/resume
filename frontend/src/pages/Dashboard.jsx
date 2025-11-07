import React, { useEffect,useState } from 'react'
import {FilePenLineIcon, PencilIcon, PlusIcon, TrashIcon, UploadCloudIcon, XIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import pdfToText from 'react-pdftotext'
import api from '../configs/api'

const Dashboard = () => {
  const {user, token} = useSelector(state => state.auth)

  const colors= ['#9333ea', '#d97706']
  const [allResumes, setAllResumes] = useState([])
  const [showCreateResume, setShowCreateResume] = useState(false)
  const [title, setTitle] = useState('')
  const [resume, setResume] = useState(null)
  const [editResumeID, setEditResumeID] = useState('')
  const [showUplaodResume, setShowUploadResume] = useState(false)
  const [isLoading, setIsLoading] = useState(false) 
  const navigate = useNavigate();


  const loadAllResumes= async() => {
    try {
      const {data} = await api.get('/api/users/resumes', {headers: { 
        Authorization: token
      }})
      setAllResumes(Array.isArray(data.resume)? data.resume:[]);
    } catch (error) {
        toast.error(error?.response?.data?.message || error.message)
        setAllResumes([]);
    }
  }
  useEffect(() =>{
    loadAllResumes()
  },[])
  
  const createResume = async(event)=>{
    try {
      event.preventDefault()
      const {data} = await api.post('/api/resumes/create', {title},{headers:
        {Authorization: token}
      }) 
      setAllResumes(prevResumes => Array.isArray(prevResumes)? [...prevResumes,data.resume] : [data.resume])
      setTitle('')
      setShowCreateResume(false)
      navigate(`/app/builder/${data.resume._id}`)
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }
  }
  const uploadResume = async(event)=>{
    event.preventDefault();
    setIsLoading(true)  
    try{
      const resumeText = await pdfToText(resume)
      const {data} = await api.post('/api/resumes/upload-resume', {title,resumeText},{headers:
        {Authorization: token}
      })
      setResume(null)
      setShowUploadResume(false)
      navigate(`app/builder/${data.resumeId}`) 
    }catch(error){
      toast.error(error?.response?.data?.message || error.message)
    }
    setIsLoading(false)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8  bg-black">
    <div className="flex flex-wrap justify-center gap-6 mt-10">
    <button onClick={()=> setShowCreateResume(true)}
      className="w-full sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-xl gap-2 
      bg-gradient-to-br from-[#372AAC] to-[#261D75] border border-indigo-800 text-white
      hover:from-indigo-600 hover:to-purple-700 hover:shadow-[0_0_20px_rgba(79,70,229,0.5)] 
      transition-all duration-300"
    >
      <PlusIcon className="size-11 p-2.5 bg-gradient-to-br from-indigo-300 to-indigo-600 rounded-lg shadow-md" />
      <p className="text-sm font-medium text-indigo-100 group-hover:text-white transition-all duration-300">
        Create Resume
      </p>
    </button>

    <button
      onClick={()=> setShowUploadResume(true)}
      className="w-full sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-xl gap-2 
      bg-gradient-to-br from-[#372AAC] to-[#261D75] border border-indigo-800 text-white
      hover:from-purple-700 hover:to-indigo-600 hover:shadow-[0_0_20px_rgba(147,51,234,0.5)] 
      transition-all duration-300"
    >
      <UploadCloudIcon  className="size-11 p-2.5 bg-gradient-to-br from-purple-300 to-purple-600 rounded-lg shadow-md" />
      <p className="text-sm font-medium text-indigo-100 group-hover:text-white transition-all duration-300">
        Upload Resume
      </p>
    </button>
  </div>
   <hr className='border-slate-300 my-6 sm:w-[305px]'/>

  <div>
    {showCreateResume && (
      
      <form 
      action="" 
      onSubmit={createResume} 
      onClick={()=>{
        setShowCreateResume(false)}} 
      className='fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center'>
      <div className=" relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6" 
      onClick={e=>e.stopPropagation()}>
          <h2 className='text-xl font-bold mb-4 text-blue-800'>
            Create a Resume
          </h2>
          <input 
          type="text" 
          placeholder='Enter resume title' 
          className='w-full border border-blue-800/50 px-4 py-2 mb-4 text-black focus:border-indigo-600 ring-indigo-600' required/>
          <button className=' w-full py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition colors'> 
            Create Resume
          </button>
          <XIcon className='absolute top-4 right-4 text-white hover:text-slate-400 cursor-pointer transition-colors' 
          onClick={()=>{setShowCreateResume(false); setTitle('');}}/>
        </div>
      </form>
    )}
    {
      showUplaodResume && (
        
        <form action="" 
        type='file'
        accept = ".pdf"
        onChange={(e) => setResume(e.target.files[0])}
        onSubmit={uploadResume} 
        onClick={()=> setShowUploadResume(false)}
         className='fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center'>
        
        <div className=" relative bg-slate-50 border shadow-md rounded-lg
        w-full max-w-sm p-6" 
        onClick={e=>e.stopPropagation()}>
          <h2 
          className='text-xl font-bold mb-4 text-white'>
            Upload Resume
          </h2>
          <input 
            onChange={(e)=>setTitle(e.target.value)} 
            type="text" 
            placeholder='Enter resume title' 
            className='w-full border border-white/50 px-4 py-2 mb-4 text-white/50 focus:border-indigo-600 ring-indigo-600' required/>
          <button 
            className=' w-full py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition colors'> 
            Upload Resume
          </button>
          <XIcon 
            className='absolute top-4 right-4 text-white  hover:text-slate-400 cursor-pointer transition-colors' 
            onClick={()=>{setShowUploadResume(false); setTitle('');}}/>
        </div>
      </form>
      )
    }
  </div>
</div>

    
  )
}

export default Dashboard
import { Pen, PenBox, Sparkles } from 'lucide-react'
import React from 'react'



const ProfessionalSummaryForm = ({data, onChange , setResumeData}) => {
  return (
    <div className='space-y-4'>
        <div className='flex items-center justify-between'>
            <div className='flex items-center gap-2 text-lg font-semibold text-gray-900'>
                <Pen className='text-blue-600'/>
                <h3>About</h3>
                <p className='text-sm text-gray-300'>Add summary for your resume here</p>
            </div>
            <button className='flex items-center gap-2 px-3 py-1
            text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200
            transition-colors disabled:opacity-50'>
                <Sparkles className='size-4'/>
                AI Enhance
            </button>
        </div>
        <div className='mt-6'>
            <textarea rows={7} 
            value={ data || " "}
            onChange={(e)=>{onChange(e.target.value)}} className='w-full p-3 px-4 mt-2 *:border tect-sm border-gray-300 rounded-lg
            focus:ring focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-none' 
            placeholder='Write a compelling professional summary that highlights your career objectives...'/>
            <p>Tip:Keep it concise and clean within 3 to 4 sentences</p>
        </div>
    </div>
  )
}

export default ProfessionalSummaryForm
import { Check, Palette } from 'lucide-react';
import { useState } from 'react';
import React from 'react'

const ColorPicker = (selectedColor, onChange) => {
    const colors = [
  { name: "Ocean Blue", hex: "#0077B6" },
  { name: "Coral", hex: "#FF6F61" },
  { name: "Forest Green", hex: "#2E8B57" },
  { name: "Sunflower", hex: "#FFC300" },
  { name: "Lavender", hex: "#B57EDC" },
  { name: "Crimson", hex: "#DC143C" },
  { name: "Teal", hex: "#008080" },
  { name: "Slate Gray", hex: "#708090" },
  { name: "Orange Peel", hex: "#FFA500" },
  { name: "Midnight", hex: "#191970" }
]
    const [isOpen, setIsOpen] =useState(false);
    const handleSelect=(hex)=>{
    if (typeof onChange=== "function"){
        onChange(hex);
    }else{
        console.warn("nothing")
    }
    setIsOpen(false)
}
    return (
    <div className='relative inline-block'> 
        <button className='flex items-center gap-1 text-sm text-purple-600 bg-gradient-to-br
        from-purple-50 to-purple-100 ring-purple-300 hover:ring transition-all px-3 py-2 rounded-lg'
        onClick={()=>setIsOpen(!isOpen)}>
            <Palette size={16}/><span className='max-sm:hidden'>Color</span>
        </button>
        {isOpen && (
            <div className='grid grid-cols-4 w-60 gap-2 absolute top-full left-0 
            left-0 right-0 p-2 mt-2 z-10 bg-white rounded-md border border-gray-200
            shadow-sm'>
                {colors.map((color)=>(
                    <div key={color.hex} className = 'relative cursor-pointer group flex flex-col' 
                    onClick={()=>{handleSelect(color.hex); setIsOpen(false)}}>
                    <div
                    className='w-12 h-12 rounded-full border-2
                    border-transparent group-hover:border-black/25
                    transition-colors' style={{backgroundColor: color.hex}}>
                        </div>
                        {selectedColor === color.hex && (
                            <div className='absolute top-0 left-0 right-0 bottom-4.5 flex items-center justify-center'>
                                <Check className='size-5 text-white'/>
                            </div>
                        )} 
                        <p className='text-xs text-center mt-1 text-gray-600'>
                            {color.name}
                        </p>
                    </div>
                ))}
            </div>
        )}
    </div>
  )
}

export default ColorPicker
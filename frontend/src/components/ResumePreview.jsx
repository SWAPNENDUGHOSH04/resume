import React from 'react'
import './templates/ModernTemplate'
import ModernTemplate from './templates/ModernTemplate'
import ClassicTemplate from './templates/ClassicTemplate'
import MinimalTemplate from './templates/MinimalTemplate'
import MinimalImageTemplate from './templates/MinimalImageTemplate'
import { useState } from 'react'
const ResumePreview = ({data,template, accentColor, classes=""}) => {
    const [showPreview,setShowPreview] = useState(false)   
    const renderTemplate =() =>{
        switch(template){
            case "modern":
                return <ModernTemplate data={data} accentColor={accentColor}/>;
            case "minimal":
                return <MinimalTemplate data={data} accentColor={accentColor}/>;
            case "minimal-image":
                return <MinimalImageTemplate data={data} accentColor={accentColor}/>;
            default:
                return <ClassicTemplate data={data} accentColor={accentColor}/>;
        }
    }
    return (
    <div >
        <div id="resume-preview" className={" hidden top-2 border border-gray-200 print:shadow-none print:border-none " + classes}>
        {renderTemplate()}
        </div>
        
        <style jsx="true">
            {`
                @page{
                    size:letter;
                    margin:0;
                }
                @media print{
                html,body{
                    width:8.5in;
                    height:11in;
                    overflow: hidden;
                }
                body * {
                visibility:hidden;
                }
                #resume-preview{
                    position:absolute;
                    left:0;
                    top:0;
                    width: 100%;
                    height: auto;
                    margin: 0;
                    padding: 0;
                    box-shadow: none !important;
                    border:none !important;
                }
                }
            `}
        </style>
    </div> 
  )
}

export default ResumePreview
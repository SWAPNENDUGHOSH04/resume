import React from 'react'

const Reviews = () => {
    const reviews=[{
        title: "Dont just take our words",
        description: "Hear what our users say about us. We're always looking for ways to improve. Please leave your thoughts here",          
    }
]
  return (
    <div id='reviews' className='flex flex-col items-center  scroll-mt-12 bg-black'>
        <div className='font-medium text-indigo-300 px-10 py-1.5 rounded-full bg-indigo-950/50 border border-indigo-700 w-max mx-auto'>
            Reviews
        </div>
        <div className="text-center">
        <h2 className="text-3xl font-semibold text-center mx-auto mt-4 text-white">
          Here's what our users say about us.
        </h2>
        <p className="mt-2 text-indigo-100/80 max-w-xl mx-auto">
          We're always looking for ways to improve . Please leave your thoughts here. 
        </p>
      </div>
    </div>
  );
};

export default Reviews
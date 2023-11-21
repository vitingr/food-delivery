import React from 'react'

const Loader = () => {
  return (
    <div className='w-full min-h-[62vh] flex justify-center items-center'>
    <div className="flex flex-row gap-2">
      <div className="w-4 h-4 rounded-full bg-[#ea1d2c] animate-bounce"></div>
      <div className="w-4 h-4 rounded-full bg-[#ea1d2c] animate-bounce [animation-delay:-.3s]"></div>
      <div className="w-4 h-4 rounded-full bg-[#ea1d2c] animate-bounce [animation-delay:-.5s]"></div>
    </div>
    </div>
  )
}

export default Loader
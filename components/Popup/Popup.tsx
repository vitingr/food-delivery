import React from 'react'
import { IoCloseOutline } from 'react-icons/io5'

const Popup = ({
  children, title, state
}: {
  children: React.ReactNode, title: string, state: any
}) => {
  return (
    <div className='popup__wrapper'>
      <div className='glassmorphism'>
        <div className='max-w-[575px] w-full p-10 bg-white rounded-xl'>
          <div className='flex justify-between items-center'>
          <h1 className='w-full text-center text-3xl font-bold'>{title}</h1>
            <IoCloseOutline size={25} className="cursor-pointer" onClick={() => state(false)} />
          </div>
          <div>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Popup
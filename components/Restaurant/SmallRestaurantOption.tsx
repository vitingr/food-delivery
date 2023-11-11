import { SmallRestaurantOption } from '@/types/types'
import Link from 'next/link'
import React from 'react'

const SmallRestaurantOption = ({ color, name, image, speciality }: SmallRestaurantOption) => {
  return (
    <Link href={`/home/${speciality}`} className='w-[125px] h-[140px] rounded-lg p-2 cursor-pointer flex flex-col justify-between  transition-all duration-300 hover:shadow-lg'>
      <div className={`${color} bg-[#bceca0] w-full h-[50px] rounded-t-3xl flex justify-center`}>
        <img src={image} className='w-[100px] h-[100px] p-2' alt="Restaurant Kind Photo" />
      </div>
      <div className=" w-full flex flex-col justify-between items-center p-4 h-full">
        <h2 className='text-center text-[#717171] h-full mt-10'>{name}</h2>
      </div>
    </Link>
  )
}

export default SmallRestaurantOption
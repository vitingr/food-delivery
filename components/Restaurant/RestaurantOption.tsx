import { RestaurantOption } from '@/types/types'
import React from 'react'
import { AiFillStar } from 'react-icons/ai'

const RestaurantOption = ({ image, name, stars, branch, distance, deliveryTime, deliveryValue}: RestaurantOption) => {
  return (
    <div className='flex gap-3 p-6 h-[135px]'>
        <img src={image} alt="Company Logo" className='rounded-xl h-full' />
        <div className='flex flex-col justify-center'>
          <h1 className='text-lg font-bold'>{name}</h1>
          <div className='flex gap-2'>
            <div className='flex gap-1'>
              <AiFillStar size={15} className="gold-icon"/>
              <p className='text-[#fcbb00] text-sm'>{stars}</p>
            </div>
            <h5 className='text-[#717171] text-sm'> • {branch} </h5>
            <h5 className='text-[#717171] text-sm'> • {distance} km </h5>
          </div>
          <div className='mt-6'>
            <h6 className='text-[#717171] bottom-restaurant'>{deliveryTime}  •  <span className='text-[#50a773]'>{deliveryValue}</span></h6>
          </div>
        </div>
    </div>
  )
}

export default RestaurantOption
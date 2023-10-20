import { RestaurantOption } from '@/types/types'
import Link from 'next/link'
import React from 'react'
import { AiFillStar } from 'react-icons/ai'

const RestaurantOption = ({ restaurantId, image, name, stars, branch, distance, deliveryTime, deliveryValue}: RestaurantOption) => {
  return (
    <Link href={`/restaurant/${restaurantId}`} className='flex gap-3 p-6 h-[135px] cursor-pointer rounded-sm restaurant__option'>
        <img src={image} alt="Company Logo" className='rounded-xl h-full' />
        <div className='flex flex-col justify-center'>
          <h1 className='text-lg font-bold'>{name}</h1>
          <div className='flex gap-2'>
            <div className='flex gap-1'>
              <AiFillStar size={15} className="gold-icon mt-[2.4px]"/>
              <p className='text-[#fcbb00]'>{stars.toFixed(1)}</p>
            </div>
            <h5 className='text-[#717171]'> • {branch} </h5>
            <h5 className='text-[#717171]'> • {distance} km </h5>
          </div>
          <div className='mt-6'>
            <h6 className='text-[#717171] bottom-restaurant'>{deliveryTime}  •  <span className='text-[#50a773]'>{deliveryValue}</span></h6>
          </div>
        </div>
    </Link>
  )
}

export default RestaurantOption
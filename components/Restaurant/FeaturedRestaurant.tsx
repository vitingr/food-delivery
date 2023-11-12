import { FeaturedRestaurant } from '@/types/types'
import Link from 'next/link'
import React from 'react'
import { RiVerifiedBadgeFill } from 'react-icons/ri'

const FeaturedRestaurant = ({ image, name, branch, verified, linkPage }: FeaturedRestaurant) => {
  return linkPage !== "/home" ? (
    <Link href={`${linkPage}`} className='pt-4 pb-10 pl-4 pr-4 border border-neutral-300 rounded-xl w-[500px] transition-all duration-200 hover:border-neutral-400 cursor-pointer'>
      {verified ? (
        <div className='flex justify-end w-full'>
          <RiVerifiedBadgeFill size={15} className="red-icon" />
        </div>
      ) : (
        <></>
      )}
      <div className='flex justify-between mt-4'>
        <img src={image} className='w-[50px] h-[50px] rounded-full ' alt="Restaurant Image" />
        <div className='w-full ml-6'>
          <h1 className='text-base selection:bg-[#ea1d2c] selection:text-white'>{name}</h1>
          <p className='text-xs text-[#717171] selection:bg-[#ea1d2c] selection:text-white'>{branch}</p>
        </div>
      </div>
    </Link>
  ) : (
    <div className='pt-4 pb-10 pl-4 pr-4 border border-neutral-300 rounded-xl w-[500px] transition-all duration-200 hover:border-neutral-400 cursor-pointer'>
      {verified ? (
        <div className='flex justify-end w-full'>
          <RiVerifiedBadgeFill size={15} className="red-icon" />
        </div>
      ) : (
        <></>
      )}
      <div className='flex justify-between mt-4'>
        <img src={image} className='w-[50px] h-[50px] rounded-full ' alt="Restaurant Image" />
        <div className='w-full ml-6'>
          <h1 className='text-base selection:bg-[#ea1d2c] selection:text-white'>{name}</h1>
          <p className='text-xs text-[#717171] selection:bg-[#ea1d2c] selection:text-white'>{branch}</p>
        </div>
      </div>
    </div>
  )
}

export default FeaturedRestaurant
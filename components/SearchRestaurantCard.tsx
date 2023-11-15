import { SearchCardProps } from '@/types/types'
import Link from 'next/link'
import React from 'react'
import { AiFillStar } from 'react-icons/ai'

const SearchRestaurantCard = ({ itemProps }: SearchCardProps) => {
  return (
    <div className='w-full flex justify-normal sm:justify-between gap-4 items-center pb-4 mt-6 border-b border-neutral-100'>
      <div className='w-[130px] sm:w-[70px]'>
        <img src={itemProps.logo} className='h-[60px] w-[60px] rounded-full selection:bg-transparent' alt="Restaurant Logo" />
      </div>
      <div className='w-full'>
        <div className='sm:gap-0 gap-2 flex sm:block items-center'>
          <h1 className='selection:bg-[#ea1d2c] selection:text-white sm:mb-0 mb-2'>{itemProps.restaurantName}</h1>
          <div className='sm:hidden gap-2 flex'>
            <AiFillStar size={10} className="gold-icon" />
            <p className='text-sm mt-[-4px] text-[#fcbb00] selection:bg-[#ea1d2c] selection:text-white'>{itemProps.stars !== undefined ? itemProps.stars.toFixed(1) : '3.0'}</p>
          </div>
        </div>
        <div className='flex sm:gap-4 sm:flex-nowrap items-center flex-wrap'>
          <div className='sm:flex gap-2 items-center hidden'>
            <AiFillStar size={10} className="gold-icon" />
            <p className='text-sm text-[#fcbb00] selection:bg-[#ea1d2c] selection:text-white'>{itemProps.stars !== undefined ? itemProps.stars.toFixed(1) : '3.0'}</p>
          </div>
          <p className='text-sm text-[#717171] selection:bg-[#ea1d2c] selection:text-white'>{itemProps.deliveryTime} • Pedido mínimo {itemProps.minValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
        </div>
      </div>
      <Link href={`/restaurant/${itemProps.id}`} className='bg-[#ea1d2c] text-white rounded-xl p-2 cursor-pointer text-center w-[150px] selection:bg-[#ea1d2c] selection:text-white sm:text-base text-sm'>
        Ver restaurante
      </Link>
    </div>
  )
}

export default SearchRestaurantCard
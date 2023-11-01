"use client"

import { RestaurantOption } from '@/types/types'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { AiFillStar } from 'react-icons/ai'

const RestaurantOption = ({ restaurantId, restaurantData }: RestaurantOption) => {

  const [isOpen, setIsOpen] = useState<boolean>(true)
  const [minPurchaseValue, setMinPurchaseValue] = useState<number>(restaurantData.minValue | 5)

  const isRestaurantOpen = async () => {
    const now = new Date()
    const currentHour = now.getHours()
    const open = currentHour <= restaurantData.closingHour && currentHour >= restaurantData.openingHour

    setIsOpen(open)
  }

  useEffect(() => {
    if (restaurantData) {
      isRestaurantOpen()
    }
  }, [restaurantData])

  return isOpen ? (
    <Link href={`/restaurant/${restaurantId}`} className='flex gap-3 p-6 h-[135px] cursor-pointer rounded-sm restaurant__option'>
      <img src={restaurantData.logo} alt="Company Logo" className='rounded-xl h-full' />
      <div className='flex flex-col justify-center'>
        <h1 className='text-lg font-bold'>{restaurantData.restaurantName}</h1>
        <div className='flex gap-2'>
          <div className='flex gap-1'>
            <AiFillStar size={14} className="gold-icon mt-[2.4px]" />
            <p className='text-[#fcbb00] text-sm'>{restaurantData.stars.toFixed(1)}</p>
          </div>
          <h5 className='text-[#717171]'> • {restaurantData.speciality} </h5>
          <h5 className='text-[#717171]'> • 2.1 km </h5>
        </div>
        <h5 className='text-[#717171] text-sm'>Valor mímimo do pedido: {minPurchaseValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} </h5>
        <div className='mt-6'>
          <h6 className='bottom-restaurant'>{restaurantData.deliveryTime}  •  <span className='text-[#50a773]'>{restaurantData.deliveryValue}</span></h6>
        </div>
      </div>
    </Link>
  ) : (
    <div className='flex gap-3 p-6 h-[135px] cursor-pointer rounded-sm restaurant__option'>
      <img src={restaurantData.logo} alt="Company Logo" className='rounded-xl h-full' />
      <div className='flex flex-col justify-center'>
        <h1 className='text-lg font-bold'>{restaurantData.restaurantName}</h1>
        <div className='flex gap-2'>
          <div className='flex gap-1'>
            <AiFillStar size={14} className="gold-icon mt-[2.4px]" />
            <p className='text-[#fcbb00] text-sm'>{restaurantData.stars.toFixed(1)}</p>
          </div>
          <h5 className='text-[#717171]'> • {restaurantData.speciality} </h5>
          <h5 className='text-[#717171]'> • 2.1 km </h5>
        </div>
        <h5 className='text-[#717171] text-sm'>Valor mímimo do pedido: {minPurchaseValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} </h5>
        <div className='mt-6'>
          <h6 className='bottom-restaurant'>Restaurante fechado no momento</h6>
        </div>
      </div>
    </div>
  )
}

export default RestaurantOption
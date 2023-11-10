import { infoUser } from '@/common/utils/userContext'
import React from 'react'
import { BsChevronDown } from 'react-icons/bs'
import { RiCoupon2Line } from 'react-icons/ri'

const Coupons = () => {

  const {data} = infoUser()

  return (
    <div className='w-full bg-[#50a773] p-6 flex items-center justify-center gap-3'>  
      <RiCoupon2Line size={27.5} className="white-icon"/>
      <h1 className='text-white text-lg'>Você tem {data.quantityCoupons } cupons! Aproveite o seus descontos</h1>
      <BsChevronDown size={25} className="white-icon cursor-pointer"/>
    </div>
  )
}

export default Coupons
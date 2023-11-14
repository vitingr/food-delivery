import { infoUser } from '@/common/utils/userContext'
import Link from 'next/link'
import React from 'react'
import { BsChevronDown } from 'react-icons/bs'
import { RiCoupon2Line } from 'react-icons/ri'

const Coupons = () => {

  const { data } = infoUser()

  return (
    <div className='w-full bg-[#50a773] p-6 flex items-center justify-center gap-3 pt-[135px]'>
      <RiCoupon2Line size={27.5} className="white-icon" />
      <h1 className='text-white text-lg sm:text-left text-center pl-3 pr-3'>Você tem {data.quantityCoupons} cupons! Aproveite o seus descontos</h1>
      <Link href="/cupons">
        <BsChevronDown size={25} className="white-icon cursor-pointer" />
      </Link>
    </div>
  )
}

export default Coupons
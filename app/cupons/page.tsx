import Coupon from '@/components/Coupon'
import React from 'react'

const page = () => {
  return (
    <div className='p-[5%] w-full flex flex-col items-center bg-[#f2f2f2]'>
      <h1 className='selection:bg-[#ea1d2c] selection:text-white sm:text-2xl text-3xl font-semibold mb-20 mt-12 sm:mb-28 w-full max-w-[1500px] sm:text-left text-center'>Meus Cupons</h1>
      <Coupon />
    </div>
  )
}

export default page
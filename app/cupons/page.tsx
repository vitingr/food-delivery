import Coupon from '@/components/Coupon'
import React from 'react'

const page = () => {
  return (
    <div className='p-[5%] w-full flex flex-col items-center bg-[#f2f2f2]'>
      <h1 className='selection:bg-[#ea1d2c] selection:text-white text-2xl font-semibold mb-32 w-full max-w-[1500px]'>Meus Cupons</h1>
      <Coupon />
    </div>
  )
}

export default page
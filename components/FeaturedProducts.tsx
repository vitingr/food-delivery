import { FeaturedProduct } from '@/types/types'
import Link from 'next/link'
import React from 'react'

const FeaturedProducts = ({ productData }: FeaturedProduct) => {
  return (
    <Link href={`/restaurant/${productData.restaurant}`}>
      <div className='p-6 border border-neutral-200 rounded-lg w-[275px] h-[455px] shadow-sm'>
        <img src={productData.productFoto} className="w-full h-[170px] rounded-md" alt="Product Photo" />
        <h1 className='selection:bg-[#ea1d2c] selection:text-white text-lg mt-4 h-[50px] overflow-hidden'>{productData.productName}</h1>
        <p className='selection:bg-[#ea1d2c] selection:text-white text-xs text-[#717171] mt-4 h-[60px] overflow-hidden'>{productData.productDescription}</p>
        <h2 className='selection:bg-[#ea1d2c] selection:text-white text-[#717171] mt-4'>{productData.productValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h2>
        <div className='pt-6 mt-6 border-t border-neutral-200'>
          <h3 className='text-center underline underline-offset-4 text-[#717171]'>Ver mais</h3>
        </div>
      </div>
    </Link>
  )
}

export default FeaturedProducts
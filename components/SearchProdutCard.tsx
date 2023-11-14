import { SearchCardProps } from '@/types/types'
import Link from 'next/link'
import React from 'react'

const SearchProdutCard = ({ itemProps }: SearchCardProps) => {
  return (
    <Link href={`/restaurant/${itemProps.restaurant}`}>
      <div className='w-[275px] p-6'>
        <img src={itemProps.productFoto} className='rounded-lg w-full h-[170px] selection:bg-transparent' alt="Product Photo" />
        <h1 className='mt-6 h-[30px] overflow-hidden selection:bg-[#ea1d2c] selection:text-white'>{itemProps.productName}</h1>
        <p className='text-[#717171] text-sm mt-4 text-justify h-[100px] overflow-hidden selection:bg-[#ea1d2c] selection:text-white'>{itemProps.productDescription}</p>
        <div className='pt-6 mt-6 border-t border-neutral-200'>
          <h3 className='text-center underline underline-offset-4 text-[#717171] selection:bg-[#ea1d2c] selection:text-white'>Ver mais</h3>
        </div>
      </div>
    </Link >
  )
}

export default SearchProdutCard
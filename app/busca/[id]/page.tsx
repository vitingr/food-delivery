"use client"

import { infoUser } from '@/common/utils/userContext'
import ToastMessage from '@/components/Config/ToastMessage'
import SearchProdutCard from '@/components/SearchProdutCard'
import SearchRestaurantCard from '@/components/SearchRestaurantCard'
import { ProductProps, RestaurantProps } from '@/types/types'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'

const page = () => {

  const { data: session, status } = useSession()
  const { data } = infoUser()

  const pathname = usePathname().split("/")
  const query = pathname[2]

  const isFetched = useRef(false)

  const [searchItems, setSearchItems] = useState<ProductProps[] | RestaurantProps[] | any>([])

  const getSearch = async () => {
    try {
      const requisition = await fetch(`https://food-delivery-nest-api.vercel.app/search/${query}`)
      const response = await requisition.json()
      setSearchItems(response)
    } catch (error) {
      toast.error("Não encontramos o que você procura...")
      console.log(error)
    }
  }

  useEffect(() => {
    if (!isFetched.current) {
      getSearch()
    } else {
      isFetched.current = true
    }
  }, [data])

  return (
    <div className='p-[5%] w-full flex flex-col items-center'>
      <ToastMessage />
      <h1 className='selection:bg-[#ea1d2c] selection:text-white sm:text-2xl text-3xl font-semibold mb-20 mt-12 sm:mb-28 w-full max-w-[1500px] sm:text-left text-center'>Itens encontrados para <span className='text-[#717171] selection:bg-[#ea1d2c] selection:text-white sm:text-2xl text-3xl font-normal mb-20 mt-12 sm:mb-20 w-full max-w-[1500px] sm:text-left text-center'>"{query}"</span></h1>
      {searchItems.length > 0 ? (
        <div className='w-full flex flex-col items-center'>
          <div className='max-w-[1600px] w-full'>
            <h2 className='text-2xl mb-10 selection:bg-[#ea1d2c] selection:text-white'>Restaurantes</h2>
            <div>
              {searchItems[1].map((item: RestaurantProps | ProductProps) => (
                <SearchRestaurantCard itemProps={item} key={item.id} />
              ))}
            </div>
          </div>
          <div className='max-w-[1600px] w-full'>
            <h2 className='text-2xl mb-10 mt-20 selection:bg-[#ea1d2c] selection:text-white'>Produtos</h2>
            <div className='w-full flex flex-wrap gap-12 sm:justify-normal justify-center'>
              {searchItems[0].map((item: RestaurantProps | ProductProps) => (
                <SearchProdutCard itemProps={item} key={item.id} />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className='max-w-[1500px] flex flex-col items-center'>
          <h1 className='font-semibold selection:bg-[#ea1d2c] selection:text-white text-center'>Nenhum item foi encontrado para sua busca</h1>
          <h3 className='mt-4 text-[#717171] selection:bg-[#ea1d2c] selection:text-white text-center'>Que tal conhecer as melhores opções na sua região?</h3>
          <Link className='mt-14 font-semibold text-[#ea1d2c] selection:bg-[#ea1d2c] selection:text-white text-center' href="/home">
            Ir para o início
          </Link>
        </div>
      )}
    </div>
  )
}

export default page
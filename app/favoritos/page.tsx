"use client"

import React, { useEffect, useRef, useState } from 'react'
import { infoUser } from '../../common/utils/userContext'
import { useSession } from 'next-auth/react'
import { ProductProps } from '@/types/types'
import Link from 'next/link'

const page = () => {

  const { data } = infoUser()
  const { data: session, status } = useSession()

  const isFetched = useRef(false)

  const [favorites, setFavorites] = useState<ProductProps[]>([])

  const getUserFavorites = async () => {
    try {
      const result = await fetch(`https://food-delivery-nest-api.vercel.app/product/getRestaurantProducts/${data.favorites}`)
      const response = await result.json()
      setFavorites(response)
    } catch (error) {
      console.log(error)
      throw new Error("ERRO! Não foi possível encontrar os pratos favoritos")
    }
  }

  useEffect(() => {
    if (!isFetched.current) {
      if (status === "authenticated" && session?.user?.email && data.id !== undefined && data.id !== null) {
        getUserFavorites()
      }
    } else {
      isFetched.current = true
    }
  }, [session, data])

  return (
    <div className='p-[5%] w-full flex flex-col items-center'>
      <h1 className='selection:bg-[#ea1d2c] selection:text-white sm:text-2xl text-3xl font-semibold mb-20 mt-12 sm:mb-28 w-full max-w-[1500px] sm:text-left text-center'>Meus Favoritos</h1>
      {favorites.length > 0 ? (
        <div className='max-w-[1500px] flex flex-col gap-8'>
          {favorites.map((favorite: ProductProps) => (
            <Link href={`/restaurant/${favorite.restaurant}`} className='border border-neutral-100 rounded-lg sm:w-[700px] min-h-[175px] pb-6 shadow-sm transition-all duration-300 hover:border-neutral-300' key={favorite.id}>
              <div className='flex justify-between p-6'>
                <div className='flex flex-col justify-center w-full'>
                  <div className='h-full '>
                    <h1 className='text-2xl font-bold flex gap-3 items-center'> {favorite.productName}</h1>
                    <h2 className='text-[#717171] text-sm mt-2'>{favorite.productDescription}</h2>
                  </div>
                  <h5 className='text-xl'>{favorite.productValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h5>
                </div>
                <div className='max-w-[125px] max-h-[125px]'>
                  <img src={favorite.productFoto} className='w-full h-full' alt="Product Image" />
                </div>
              </div>
              <div className='w-full flex justify-center mt-8'>
                <h1 className='text-[#ea1d2c] cursor-pointer'>Remover dos Salvos</h1>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className='max-w-[1500px] flex flex-col items-center'>
          <h1 className='font-semibold selection:bg-[#ea1d2c] selection:text-white text-center'>Você ainda não tem pedidos favoritos</h1>
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
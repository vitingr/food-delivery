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
      const result = await fetch(`http://localhost:3001/getRestaurantProducts/${data.favorites}`)
      const response = await result.json()
      setFavorites(response)
    } catch (error) { 
      throw new Error("ERRO! Não foi possível encontrar os pratos favoritos")
    }
  }

  useEffect(() => {
    if (!isFetched.current && status === "authenticated" && session?.user?.email) {
      getUserFavorites()
    } else {
      isFetched.current = true
    }
  }, [session])

  return (
    <div className='p-[5%] w-full flex flex-col items-center'>
      <h1 className='selection:bg-[#ea1d2c] selection:text-white text-2xl font-semibold mb-32 w-full max-w-[1500px]'>Meus Favoritos</h1>
      {favorites.length > 0 ? (
        <div></div>
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
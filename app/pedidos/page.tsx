"use client"

import { infoUser } from '@/common/utils/userContext'
import { AddressProps, PurchaseProps, RestaurantProps } from '@/types/types'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const page = () => {

  const { data: session, status } = useSession()
  const { data } = infoUser()

  const [purchases, setPurchases] = useState<PurchaseProps[]>([])
  const [restaurants, setRestaurants] = useState<RestaurantProps[]>([])
  const [addresses, setAddresses] = useState<any>([])

  const getPurchases = async () => {
    try {
      const result = await fetch(`http://localhost:3001/purchase/${data.id}`)
      const response = await result.json()

      console.log(response)

      setPurchases(response)

    } catch (error) {
      console.log(error)
      throw new Error("Não foi possível obter os pedidos do restaurante")
    }
  }

  const getRestaurants = async () => {
    const requisition = await fetch("http://localhost:3001/restaurant")
    const response = await requisition.json()
    setRestaurants(response)
    console.log(response)
  }

  const getAddresses = async () => {
    try {
      const requisition = await fetch(`http://localhost:3001/address`)
      const response = await requisition.json()

      setAddresses(response)

    } catch (error) {
      console.log(error)
      throw new Error("Não foi possível obter os endereços dos pedidos")
    }
  }

  useEffect(() => {
    if (data.id !== undefined && status === "authenticated") {
      getPurchases()
      getRestaurants()
      getAddresses()
    }
  }, [session, data])

  return (
    <div className='p-[5%] w-full flex flex-col items-center'>
      <h1 className='selection:bg-[#ea1d2c] selection:text-white text-2xl font-semibold mb-32 w-full max-w-[1500px]'>Meus Pedidos</h1>

      {purchases.length > 0 ? (
        <div className='max-w-[1500px]'>
          {purchases.map((purchase: PurchaseProps) => (
            <div key={purchase.id} className='shadow-sm p-10 sm:w-[550px] w-[450px] border border-neutral-200 rounded-lg'>
              <div className='flex justify-between w-full'>
                <div className='w-full flex gap-4'>
                  <img src={purchase.restaurantLogo} className='w-[125px] h-[125px]' alt="Restaurant Logo" />
                  {purchase.takeOption === "Retirada" ? (
                    <>
                      <h1>{purchase.restaurantName}</h1>
                      <h2 className='font-semibold selection:bg-[#ea1d2c] selection:text-white'>{purchase.deliveryPlace}</h2>
                      <h4 className='text-[#ea1d2c] text-sm mt-2 selection:bg-[#ea1d2c] selection:text-white'>Entregar no endereço</h4>
                    </>
                  ) : (
                    <>
                      <h1>{purchase.restaurantName}</h1>
                      <h2 className='font-semibold selection:bg-[#ea1d2c] selection:text-white'>{purchase.deliveryPlace}</h2>
                      <h4 className='text-[#ea1d2c] text-sm mt-2 selection:bg-[#ea1d2c] selection:text-white'>Entregar no endereço</h4>
                    </>
                  )}
                </div>
                <div className='w-full'>

                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className='max-w-[1500px] flex flex-col items-center'>
          <h1 className='font-semibold selection:bg-[#ea1d2c] selection:text-white text-center'>Você ainda não pediu nada</h1>
          <h3 className='mt-4 text-[#717171] selection:bg-[#ea1d2c] selection:text-white text-center'>Que tal conhecer as melhores opções na sua região</h3>
          <Link className='mt-14 font-semibold text-[#ea1d2c] selection:bg-[#ea1d2c] selection:text-white text-center' href="/home">
            Ir para o início
          </Link>
        </div>
      )}
    </div>
  )
}

export default page
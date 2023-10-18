"use client"

import { useSession } from 'next-auth/react'
import React, { useEffect, useState, useRef } from 'react'
import { RiVerifiedBadgeFill } from 'react-icons/ri'
import { AiFillStar } from 'react-icons/ai'
import { BsCoin } from 'react-icons/bs'
import { useRouter } from 'next/navigation'
import { APP_ROUTES } from '@/constants/app-routes'
import { toast } from 'react-toastify'
import ToastMessage from '@/components/ToastMessage'
import Link from 'next/link'
import { RestaurantData } from '@/types/types'

const page = () => {

  const { data: session, status } = useSession()

  const isFetched = useRef(true)

  const router = useRouter()

  const [restaurantData, setRestaurantData] = useState<RestaurantData | any>([])
  const [categories, setCategories] = useState<any>([])

  const [isOwner, setIsOwner] = useState<boolean>(false)

  const getRestaurantData = async () => {
    const requisition = await fetch(`http://localhost:3001/restaurant/${session?.user?.email}`)
    const response = await requisition.json()

    if (response !== null) {
      if (response.email === session?.user?.email) {
        setRestaurantData(response)
        setIsOwner(true)

        getRestaurantCategories(response.id)
      } else {
        toast.error("Você não pode editar um restaurante que não é seu")
        router.push(APP_ROUTES.private.usuario)
      }
    } else {
      toast.error("Você não pode editar um restaurante que não existe")
      router.push(APP_ROUTES.private.usuario)
    }
  }

  const getRestaurantCategories = async (restaurantId: string) => {
    try {
      console.log("A")
      const requisition = await fetch(`http://localhost:3001/category/${restaurantId}`)
      const response = await requisition.json()
      console.log(response)
      if (response !== null) {
        setCategories(response)
      }

    } catch (error) {
      console.log(error)
      throw new Error("Não foi possível obter as categorias de produtos do restaurantes")
    }
  }

  useEffect(() => {
    if (isFetched.current) {
      if (session?.user?.email !== undefined && status === "authenticated") {
        getRestaurantData()
      }
    } else {
      isFetched.current = true
    }
  }, [])

  // useEffect(() => {
  //   if (session?.user?.email !== undefined && status === "authenticated") {
  //     getRestaurantData()
  //   }
  // }, [session, status, restaurantData])

  return isOwner === true ? (
    <div className='bg-[#f2f2f2] w-full min-h-[62vh] flex flex-col items-center p-[2%]'>
      <ToastMessage />
      <div className='bg-white max-w-[1500px] w-full rounded-sm p-16'>
        <div className='bg-[url("https://www.ifood.com.br/static/images/merchant/banner/DEFAULT.png")] bg-cover bg-no-repeat w-full h-[200px] rounded-xl' />
        <div className='mt-10 flex justify-between w-full'>
          <div className='flex gap-6 w-full'>
            <img src={restaurantData.logo} className='rounded-full w-[80px] h-[80px]' alt="Restaurant Image" />
            <div>
              <div className='flex items-center gap-2'>
                <h1 className='text-2xl'>{restaurantData.restaurantName}</h1>
                <RiVerifiedBadgeFill size={22.5} className="red-icon" />
              </div>
              <div>
                <h5 className='text-[#717171] text-sm'>Especialidade da casa: {restaurantData.speciality}</h5>
                <h6 className='text-[#717171] text-sm'>Tempo de entrega: ≅ {restaurantData.deliveryTime}</h6>
              </div>
            </div>
          </div>
          <div className=''>
            <div className='flex gap-8 h-[25px]'>
              <div className='flex gap-3 items-center'>
                <AiFillStar size={15} className="gold-icon" />
                <h3>{restaurantData.stars}.0</h3>
              </div>
              <div className='w-[200px] flex items-center gap-3 pl-8 border-l border-neutral-300'>
                <BsCoin size={15} className="gray-icon" />
                <p className='text-sm text-[#717171]'>Pedido mínimo R$ {restaurantData.deliveryValue}5,00</p>
              </div>
            </div>
            <div className='mt-2 flex gap-4'>
              <div className='w-full'>
                <h3 className='text-sm text-[#717171]'>Brasil - {restaurantData.state}, {restaurantData.city}</h3>
                <h5 className='text-base text-[#717171]'>{restaurantData.street}, {restaurantData.address}</h5>
              </div>
              <Link href="/restaurant/edit" className='bg-[#ea1d2c] text-white w-[150px] flex items-center justify-center rounded-lg cursor-pointer text-lg'>
                Editar
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className='bg-white w-full min-h-[18vh] p-16 mt-[75px] max-w-[1500px]'>
        <h1 className='w-full text-center text-3xl font-bold selection:bg-[#ea1d2c] selection:text-white'>Menu do Restaurante</h1>
      </div>
    </div>
  ) : (
    <></>
  )
}

export default page
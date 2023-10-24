"use client"

import ToastMessage from '@/components/Config/ToastMessage'
import { APP_ROUTES } from '@/constants/app-routes'
import { RestaurantData } from '@/types/types'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState, useRef } from 'react'
import { toast } from 'react-toastify'
import { IoHomeOutline, IoTicketOutline, IoSettingsOutline } from 'react-icons/io5'
import { AiOutlineClockCircle, AiOutlineStar } from 'react-icons/ai'
import { MdAttachMoney, MdRestaurantMenu } from 'react-icons/md'
import EditMenu from '@/components/Restaurant/EditMenu'
import { infoUser } from '@/common/utils/userContext'

const page = () => {

  const { data: session, status } = useSession()
  const {data} = infoUser()
  const isFetched = useRef(false)

  const router = useRouter()

  const [restaurantData, setRestaurantData] = useState<RestaurantData | any>([])
  const [categories, setCategories] = useState<any>([])

  const [isOwner, setIsOwner] = useState<boolean>(false)
  const [currentSection, setCurrentSection] = useState<string>("")

  const getRestaurantData = async () => {
    const requisition = await fetch(`http://localhost:3001/restaurant/${data.restaurantId}`)
    const response = await requisition.json()

    if (response !== null) {
      if (response.id === data.restaurantId) {
        setRestaurantData(response)
        setIsOwner(true)

        // getRestaurantCategories(response.id)
      } else {
        toast.error("Você não pode editar um restaurante que não é seu")
        router.push(APP_ROUTES.private.usuario)
      }
    } else {
      toast.error("Você não pode editar um restaurante que não existe")
      router.push(APP_ROUTES.private.usuario)
    }
  }

  useEffect(() => {
    if (!isFetched.current) {
      if (session?.user?.email !== undefined && status === "authenticated" && data.id !== null) {
        getRestaurantData()
      }
    } else {
      isFetched.current = true
    }
  }, [data])

  return isOwner === true ? (
    <div className='w-full h-full flex justify-between'>
      <ToastMessage />
      <div className='hidden sm:block p-12 h-full min-h-[78vh] w-full max-w-[375px] border-r border-[#3e3e3e27] bg-[#efefef59]'>
        <div className='flex flex-col items-center'>
          <img src={restaurantData.logo} alt="Company Logo" className='w-[150px] h-[150px] rounded-lg mt-[-25px]' />
          <h1 className='mt-6 font-bold text-2xl uppercase'>{restaurantData.restaurantName}</h1>
        </div>
        <div className='mt-16 h-full'>
          <ul className='list-none flex flex-col gap-2'>
            <li className="flex gap-4 items-center leftbar__item pb-2 pt-2">
              <IoHomeOutline size={20} />
              <Link href="/restaurant">Ínicio</Link>
            </li>
            <li className="flex gap-4 items-center leftbar__item pb-2 pt-2" onClick={() => setCurrentSection("ratings")}>
              <AiOutlineStar size={20} />
              <h1>Avaliações</h1>
            </li>
            <li className="flex gap-4 items-center leftbar__item pb-2 pt-2" onClick={() => setCurrentSection("purchases")}>
              <IoTicketOutline size={20} />
              <h1>Pedidos</h1>
            </li>
            <li className="flex gap-4 items-center leftbar__item pb-2 pt-2" onClick={() => setCurrentSection("menu")}>
              <MdRestaurantMenu size={20} />
              <h1>Cardápio</h1>
            </li>
            <li className="flex gap-4 items-center leftbar__item pb-2 pt-2" onClick={() => setCurrentSection("financial")}>
              <MdAttachMoney size={20} />
              <h1>Financeiro</h1>
            </li>
            <li className="flex gap-4 items-center leftbar__item pb-2 pt-2" onClick={() => setCurrentSection("time")}>
              <AiOutlineClockCircle size={20} />
              <h1>Horários</h1>
            </li>
            <li className="flex gap-4 items-center leftbar__item pb-2 pt-2" onClick={() => setCurrentSection("settings")}>
              <IoSettingsOutline size={20} />
              <h1>Configurações</h1>
            </li>
          </ul>
        </div>
      </div>

      <div className='w-full'>
    	  <EditMenu currentSection={currentSection} restaurantId={restaurantData.id} restaurantData={restaurantData} />
      </div>
    </div>
  ) : (
    <></>
  )
}

export default page
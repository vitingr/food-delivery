"use client"

import { useSession } from 'next-auth/react'
import React, { useEffect, useState, useRef } from 'react'
import {IoAdd} from 'react-icons/io5'
import { RiVerifiedBadgeFill } from 'react-icons/ri'
import { AiFillStar } from 'react-icons/ai'
import { BsCoin } from 'react-icons/bs'
import { useRouter } from 'next/navigation'
import { APP_ROUTES } from '@/constants/app-routes'
import { toast } from 'react-toastify'
import ToastMessage from '@/components/Config/ToastMessage'
import Link from 'next/link'
import { RestaurantData } from '@/types/types'
import { infoUser } from '@/common/utils/userContext'
import Popup from '@/components/Popup/Popup'

const page = () => {

  const { data: session, status } = useSession()
  const { data } = infoUser()

  const isFetched = useRef(false)

  const router = useRouter()

  const [restaurantData, setRestaurantData] = useState<RestaurantData | any>([])
  const [categories, setCategories] = useState<any>([])
  const [products, setProducts] = useState<any>([])

  const [buyingProducts, setBuyingProducts] = useState<boolean>(false)

  const [isOwner, setIsOwner] = useState<boolean>(false)

  const getRestaurantData = async () => {
    const requisition = await fetch(`http://localhost:3001/restaurant/${data.restaurantId}`)
    const response = await requisition.json()
    console.log(response)

    if (response !== null) {
      if (response.id === data.restaurantId) {
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
      const requisition = await fetch(`http://localhost:3001/category/${restaurantId}`)
      const response = await requisition.json()

      setCategories(response)

      getRestaurantProducts(restaurantId)

    } catch (error) {
      console.log(error)
      throw new Error("Não foi possível obter as categorias de produtos do restaurante")
    }
  }

  const getRestaurantProducts = async (restaurantId: string) => {
    try {
      const requisition = await fetch(`http://localhost:3001/product/${restaurantId}`)
      const response = await requisition.json()

      setProducts(response)

    } catch (error) {
      console.log(error)
      throw new Error("Não foi possível obter os produtos do restaurante")
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
    <div className='bg-[#f2f2f2] w-full min-h-[62vh] flex flex-col items-center p-[2%]'>
      <ToastMessage />
      <div className='bg-white max-w-[1300px] w-full rounded-sm p-16'>
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

      <div className='bg-white w-full min-h-[18vh] p-16 mt-[75px] max-w-[1300px]'>
        <h1 className='w-full text-center text-4xl font-bold selection:bg-[#ea1d2c] selection:text-white mb-[50px]'>Menu do Restaurante</h1>
        {categories.length > 0 ? (
          <>
            {categories.map((category: {
              id: string,
              restaurant: string,
              categoryName: string,
              categoryDescription: string,
              quantityItems: number
            }) => (
              <div className='mt-[75px]' key={category.id}>
                <div>
                  <div className='flex items-end gap-2'>
                    <h2 className='font-bold text-2xl'>{category.categoryName}</h2>
                    {category.quantityItems === 0 ? <h5 className='text-sm'>Categoria vazia</h5> : <h5 className='text-sm'>{category.quantityItems} itens na categoria</h5>}
                  </div>
                  <h6 className='text-base text-[#717171] '>{category.categoryDescription}</h6>
                </div>
                <div className='mt-16 grid grid-cols-2 gap-8'>
                  {products.map((product: {
                    id: string,
                    restaurant: string,
                    category: string,
                    productName: string,
                    productDescription: string,
                    productValue: number,
                    productFoto: string,
                  }) => (
                    <>
                      {product.category === category.id ? (
                        <>
                          <div className='flex justify-between p-6 border border-neutral-100 rounded-lg h-[175px] w-full shadow-sm cursor-pointer transition-all duration-300 hover:border-neutral-300' key={category.id} onClick={() => setBuyingProducts(true)}>
                            <div className='flex flex-col justify-center w-full'>
                              <div className='h-full '>
                                <h1 className='text-2xl font-bold'>{product.productName}</h1>
                                <h2 className='text-[#717171] text-sm mt-2'>{product.productDescription}</h2>
                              </div>
                              <h5 className='text-xl'>{product.productValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h5>
                            </div>
                            <div>
                              <img src={product.productFoto} className='w-[125px] h-[125px]' alt="Product Image" />
                            </div>
                          </div>
                        </>
                      ) : (<></>)}
                    </>
                  ))}
                </div>
              </div>
            ))}
          </>
        ) : (
          <p>Esse restaurante ainda não adicionou nada ao seu cardápio</p>
        )}

        {buyingProducts ? (
          <Popup state={setBuyingProducts} title={`Realizar Pedidos`}>
            <form onSubmit={(e: React.SyntheticEvent) => {
              e.preventDefault()

            }} className='mt-14 z-50 flex flex-col overflow-y-scroll max-h-[500px] pr-10'>
              {categories.map((category: {
                id: string,
                restaurant: string,
                categoryName: string,
                categoryDescription: string,
                quantityItems: number
              }) => (
                <div className='w-full pt-8 pb-4 border-t border-neutral-200' key={category.id}>
                  <h2 className='font-bold mb-10 text-xl'>{category.categoryName}</h2>
                  <div>
                    {products.map((product: {
                      id: string,
                      restaurant: string,
                      category: string,
                      productName: string,
                      productDescription: string,
                      productValue: number,
                      productFoto: string,
                    }) => (
                      <div key={product.id}>
                        {product.category === category.id ? (
                          <div className='flex justify-between mb-5'>
                            <div className='w-full'>
                              <h1 className='text-lg font-semibold'>{product.productName}</h1>
                              <h2 className='text-[#717171]'>+ {product.productValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h2>
                            </div>
                            <img src={product.productFoto} alt="Product Photo" className='w-[65px] h-[65px]' />
                            <div className='ml-6 flex items-center cursor-pointer'>
                              <IoAdd size={25} className="red-icon"/>
                            </div>
                          </div>
                        ) : (<></>)}
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              <div className='flex justify-between mt-10'>
                <h1 className='w-full'>Valor total do pedido: R$0,00</h1>
                <h1 className='w-full flex justify-end text-[#717171]'>0 itens</h1>
              </div>
              <button className='mt-6 w-full bg-[#ea1d2c] rounded-xl p-4 text-center text-white font-bold cursor-pointer' type='submit'>
                Confirmar Pedido
              </button>

            </form>
          </Popup>
        ) : (<></>)}

      </div>
    </div>
  ) : (
    <></>
  )
}

export default page
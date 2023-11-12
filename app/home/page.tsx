"use client"

import { randomize } from '@/common/functions/randomItems'
import FeaturedProducts from '@/components/FeaturedProducts'
import ProductsSwiper from '@/components/ProductsSwiper'
import FeaturedRestaurant from '@/components/Restaurant/FeaturedRestaurant'
import RestaurantOption from '@/components/Restaurant/RestaurantOption'
import SmallRestaurantOption from '@/components/Restaurant/SmallRestaurantOption'
import { FEATURED_RESTAURANTS } from '@/constants/featuredRestaurants'
import { RESTAURANT_OPTIONS } from '@/constants/home'
import { ProductProps, RestaurantProps } from '@/types/types'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import { IoSearchOutline } from 'react-icons/io5'

const page = () => {

  const { data: session, status } = useSession()

  const isFetched = useRef(false)

  const [restaurants, setRestaurants] = useState<RestaurantProps[] | any>([])
  const [products, setProducts] = useState<ProductProps[]>([])

  const getRestaurants = async () => {
    const requisition = await fetch("http://localhost:3001/restaurant")
    const response = await requisition.json()
    setRestaurants(response)
  }

  const getProducts = async () => {
    const requisition = await fetch("http://localhost:3001/product")
    const response = await requisition.json()
    const randomProducts = await randomize(response)
    setProducts(randomProducts)
  }

  useEffect(() => {
    if (session?.user?.email !== undefined && status === "authenticated") {
      getRestaurants()
      if (!isFetched.current) {
        getProducts()
      } else {
        isFetched.current = true
      }
    }
  }, [session])

  return (
    <div className='overflow-hidden w-full flex flex-col items-center sm:p-[2%]'>

      <section className='w-full flex flex-col items-center justify-center p-[2%]'>
        <div className='w-full max-w-[1600px]'>
          <h2 className='w-full pt-16 pb-10 border-t border-neutral-300 text-3xl selection:bg-[#ea1d2c] selection:text-white'>Os melhores restaurantes</h2>
          <div className='flex sm:flex-nowrap flex-wrap gap-6'>
            {FEATURED_RESTAURANTS.map((restaurant: any) => (
              <FeaturedRestaurant image={restaurant.image} name={restaurant.name} branch={restaurant.branch} verified={restaurant.verified} linkPage={restaurant.linkPage} />
            ))}
          </div>
        </div>
      </section>

      <section className='w-[2600px]  overflow-hidden mt-[50px] flex flex-col items-center'>
        <h2 className='w-full text-3xl selection:bg-[#ea1d2c] selection:text-white max-w-[1600px] mb-6'>Destaques</h2>
        <ProductsSwiper content={products} />  
      </section>

      <section className='max-w-[1600px] w-full mt-[100px]'>
        <h2 className='sm:text-2xl text-4xl selection:bg-[#ea1d2c] selection:text-white text-center sm:text-left'>Você pode gostar</h2>
        <h5 className='text-[#717171] sm:text-sm text-base selection:bg-[#ea1d2c] selection:text-white text-center sm:text-left'>Escolha o que você mais deseja</h5>
        <div className='w-full flex flex-wrap sm:justify-normal justify-center sm:gap-6 gap-14 mt-14'>
          {RESTAURANT_OPTIONS.map((restaurant: any) => (
            <SmallRestaurantOption color={restaurant.color} image={restaurant.image} name={restaurant.name} speciality={restaurant.speciality} key={restaurant.name} />
          ))}
        </div>
      </section>

      <section className='mt-[100px] max-w-[1600px] w-full'>
        <h2 className='sm:text-2xl text-4xl selection:bg-[#ea1d2c] selection:text-white text-center sm:text-left'>Mais Food Delivery para você</h2>
        <h5 className='text-[#717171] sm:text-sm text-base selection:bg-[#ea1d2c] selection:text-white text-center sm:text-left'>Veja mais algumas opções especiais</h5>
        <div className='w-full flex flex-wrap sm:gap-6 gap-14 mt-14'>
          <Link href="/cupons" className='cursor-pointer flex flex-col items-center'>
            <img src="https://static.ifood-static.com.br/image/upload/t_medium/discoveries/03cupons_ESAv.png?imwidth=128" className='w-[100px]' alt="Cupom Image" />
            <h2 className='text-[#717171] mt-2'>Ver cupons</h2>
          </Link>
        </div>
      </section>

      <section className='mt-[100px] max-w-[1600px] w-full overflow-hidden'>
        <h2 className='sm:text-2xl text-4xl selection:bg-[#ea1d2c] selection:text-white text-center sm:text-left'>Restaurantes e Mercados</h2>
        <h5 className='text-[#717171] sm:text-sm text-base selection:bg-[#ea1d2c] selection:text-white text-center sm:text-left'>Veja algumas opções de estabelecimentos</h5>
        <div className='mt-16 flex justify-between items-center w-full bg-[#b8b8b83f] rounded-full pl-6 p-2'>
          <input type="text" name="search" id="search" placeholder='Buscar Loja' autoComplete='off' className='w-full outline-none bg-transparent p-2' />
          <IoSearchOutline size={25} className="cursor-pointer mr-6" />
        </div>
        <div className='w-full flex flex-wrap sm:flex-nowrap justify-between sm:gap-6 gap-14 mt-14 max-h-[700px] overflow-hidden'>
          <div className='w-full flex flex-col flex-wrap gap-2'>
            {restaurants.map((restaurant: RestaurantProps) => (
              <div key={restaurant.id}>
                <RestaurantOption restaurantId={restaurant.id} restaurantData={restaurant} />
              </div>
            ))}
          </div>
        </div>
        <div className='w-full p-4 font-bold flex justify-center items-center text-[#ea1d2c] mt-16 cursor-pointer transition-all duration-300 hover:text-white hover:bg-[#ea1d2c] rounded-xl'>Ver mais</div>
      </section>

      <section className='mt-[200px] mb-[150px] w-full flex justify-center'>
        <img src="https://static.ifood-static.com.br/image/upload/t_high,q_100/webapp/landingV2/ifood-benefits-desktop.png" alt="Logo" className='w-full max-w-[1600px] cursor-pointer' />
      </section>
    </div >
  )
}

export default page
"use client"

import FeaturedRestaurant from '@/components/Restaurant/FeaturedRestaurant'
import RestaurantOption from '@/components/Restaurant/RestaurantOption'
import SmallRestaurantOption from '@/components/Restaurant/SmallRestaurantOption'
import { RestaurantProps } from '@/types/types'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { IoSearchOutline } from 'react-icons/io5'

const page = () => {

  const { data: session, status } = useSession()

  const [restaurants, setRestaurants] = useState<RestaurantProps[] | any>([])
  const [isOpen, setIsOpen] = useState<boolean>(true)

  const getRestaurants = async () => {
    const requisition = await fetch("http://localhost:3001/restaurant")
    const response = await requisition.json()
    setRestaurants(response)
    console.log(response)
  }

  const isRestaurantOpen = async () => {
    const now = new Date()
    const currentHour = now.getHours()
    const open = currentHour <= 23 && currentHour >= 11

    setIsOpen(open)
  }

  useEffect(() => {
    if (session?.user?.email !== undefined && status === "authenticated") {
      getRestaurants()
      isRestaurantOpen()
    }
  }, [session])

  return (
    <div className='w-full flex flex-col items-center sm:p-[2%]'>
      <section className='w-full flex flex-col items-center justify-center p-[2%]'>
        <div className='w-full max-w-[1600px]'>
          <h2 className='w-full pt-16 pb-10 border-t border-neutral-300 text-3xl selection:bg-[#ea1d2c] selection:text-white'>
            Os melhores restaurantes
          </h2>
          <div className='flex gap-6'>
            <FeaturedRestaurant image='https://static.ifood-static.com.br/image/upload/t_thumbnail/logosgde/Logo%20McDonald_MCDON_DRIV15.jpg?imwidth=128' name="Mcdonalds's" branch='Lanches' verified={true} />
            <FeaturedRestaurant image='https://static.ifood-static.com.br/image/upload/t_thumbnail/logosgde/201910292243_94aaf166-84cc-4ebf-a35d-d223be34d01f.png?imwidth=64' name='Coco Bambu' branch='Frutos do mar' verified={true} />
            <FeaturedRestaurant image='https://static.ifood-static.com.br/image/upload/t_thumbnail/logosgde/201906182008_2b157a73-7564-4733-94c1-8d0376e7bb39.png?imwidth=64' name='Outback Steakhouse' branch='Australiana' verified={true} />
            <FeaturedRestaurant image='https://static.ifood-static.com.br/image/upload/t_thumbnail/logosgde/201801231937__HABIB_VERDE.jpg?imwidth=64' name="Habib's" branch='Culinária Árabe' verified={true} />
            <FeaturedRestaurant image='https://static.ifood-static.com.br/image/upload/t_thumbnail/logosgde/d4a3984f-2b73-4f46-99df-1d6bc79ff293/202001031317_CXpO_i.png?imwidth=64' name='China in Box' branch='Chinesa' verified={true} />
          </div>
        </div>
      </section>

      <section className='max-w-[1600px] w-full'>
        <h2 className='sm:text-2xl text-4xl selection:bg-[#ea1d2c] selection:text-white text-center sm:text-left'>Você pode gostar</h2>
        <h5 className='text-[#717171] sm:text-sm text-base selection:bg-[#ea1d2c] selection:text-white text-center sm:text-left'>Escolha o que você mais deseja</h5>
        <div className='w-full flex flex-wrap sm:justify-normal justify-between sm:gap-6 gap-14 mt-14'>
          <SmallRestaurantOption color="bg-[#bceca0]" image='https://cdn3.iconfinder.com/data/icons/3d-black-friday/512/basket.png' name='Mercado' speciality='Mercado' />
          <SmallRestaurantOption color="bg-[#fff19f]" image='https://png.pngtree.com/png-vector/20230918/ourmid/pngtree-picanha-and-salad-brazilian-food-png-image_10093980.png' name='Brasileira' speciality='Brasileira' />
          <SmallRestaurantOption color="bg-[#bceca0]" image='https://static.wixstatic.com/media/b617de_6d6f1d19c89747268fc6fbe5f6f5ac32~mv2.png/v1/crop/x_1315,y_624,w_5166,h_3917/fill/w_342,h_258,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/MARMITA_03.png' name='Marmita'  speciality='Marmita' />
          <SmallRestaurantOption color="bg-[#ffc3cf]" image='https://www.imagensempng.com.br/wp-content/uploads/2021/06/03-20.png' name='Lanches'  speciality='Lanches' />
          <SmallRestaurantOption color="bg-[#ffc3cf]" image='https://outback-prod.s3-ap-southeast-1.amazonaws.com/image/ds-BABY-BACK-PORK-RIBS-128.png' name='Carnes'  speciality='Carnes' />
          <SmallRestaurantOption color="bg-[#d0a8ef]" image='https://img2.deliverydireto.com.br/unsafe/origxorig/https://duisktnou8b89.cloudfront.net/img/items/626990ac6a139.png' name='Japonesa'  speciality='Japonesa' />
          <SmallRestaurantOption color="bg-[#bceca0]" image='https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/53f59ee3-60ce-4d32-8885-c6f05457259c/dfoc3b1-a21e369b-cb5d-4fbf-8f48-62b303fbf978.png/v1/fill/w_600,h_600/healthy_food_png_transparent_background__9__by_anavrin_stock_dfoc3b1-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzUzZjU5ZWUzLTYwY2UtNGQzMi04ODg1LWM2ZjA1NDU3MjU5Y1wvZGZvYzNiMS1hMjFlMzY5Yi1jYjVkLTRmYmYtOGY0OC02MmIzMDNmYmY5NzgucG5nIiwiaGVpZ2h0IjoiPD02MDAiLCJ3aWR0aCI6Ijw9NjAwIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLndhdGVybWFyayJdLCJ3bWsiOnsicGF0aCI6Ilwvd21cLzUzZjU5ZWUzLTYwY2UtNGQzMi04ODg1LWM2ZjA1NDU3MjU5Y1wvYW5hdnJpbi1zdG9jay00LnBuZyIsIm9wYWNpdHkiOjk1LCJwcm9wb3J0aW9ucyI6MC40NSwiZ3Jhdml0eSI6ImNlbnRlciJ9fQ.yK-vMh2bpOTZCqRKdl1boSEZsn0IMFQJaFnhtcZ1j4w' name='Saudável'  speciality='Saudável' />
          <SmallRestaurantOption color="bg-[#bceca0]" image='https://static.vecteezy.com/system/resources/previews/009/887/173/non_2x/spaghetti-italian-pasta-with-tomato-sauce-free-png.png' name='Italiana'  speciality='Italiana' />
          <SmallRestaurantOption color="bg-[#d0a8ef]" image='https://freepngimg.com/save/139366-healthy-food-plate-free-download-png-hq/643x645' name='Gourmet'  speciality='Gourmet' />
          <SmallRestaurantOption color="bg-[#fff19f]" image='https://png.monster/wp-content/uploads/2022/06/png.monster-608.png' name='Padarias' speciality='Padaria' />
          <SmallRestaurantOption color="bg-[#ffc3cf]" image='https://pngimg.com/uploads/noodle/noodle_PNG34.png' name='Chinesa'  speciality='Padaria' />
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
          <input type="text" name="search" id="search" placeholder='Buscar Loja' className='w-full outline-none bg-transparent p-2' />
          <IoSearchOutline size={25} className="cursor-pointer mr-6" />
        </div>
        <div className='w-full flex flex-wrap sm:flex-nowrap justify-between sm:gap-6 gap-14 mt-14 max-h-[700px] overflow-hidden'>
          <div className='w-full flex flex-col flex-wrap gap-2'>
            {restaurants.map((restaurant: RestaurantProps) => (
              <div>
                {isOpen ? (
                  <RestaurantOption restaurantId={restaurant.id} image={restaurant.logo} name={restaurant.restaurantName} stars={restaurant.stars} branch={restaurant.speciality} distance={0.1} deliveryTime={restaurant.deliveryTime} deliveryValue={"Grátis"} isOpen={true} />
                ) : (
                  <RestaurantOption restaurantId={restaurant.id} image={restaurant.logo} name={restaurant.restaurantName} stars={restaurant.stars} branch={restaurant.speciality} distance={0.1} deliveryTime={restaurant.deliveryTime} deliveryValue={"Grátis"} isOpen={false} />
                )}
              </div>
            ))}
          </div>
        </div>
        <div className='w-full p-4 font-bold flex justify-center items-center text-[#ea1d2c] mt-16 cursor-pointer transition-all duration-300 hover:text-white hover:bg-[#ea1d2c] rounded-xl'>Ver mais</div>
      </section>

      <section className='mt-[200px] mb-[150px] w-full flex justify-center'>
        <img src="https://static.ifood-static.com.br/image/upload/t_high,q_100/webapp/landingV2/ifood-benefits-desktop.png" alt="Logo" className='w-full max-w-[1600px] cursor-pointer' />
      </section>
    </div>
  )
}

export default page
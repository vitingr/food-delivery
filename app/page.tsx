"use client"

import FeaturedRestaurant from '@/components/Restaurant/FeaturedRestaurant'
import Link from 'next/link'
import { useState } from 'react'
import { IoSearchOutline, IoChevronForwardOutline } from 'react-icons/io5'

export default function Home() {

  const [search, setSearch] = useState<string>("")

  const buscar = async (value: string) => {
    const query = value.replace(" ", "-")
    setSearch(query)
  }

  return (
    <div className='w-full h-full'>
      <section className='bg-[url("https://www.ifood.com.br/static/images/groceries-landing-page/desktop-background.png")] w-full min-h-[78vh] sm:p-[10%] p-[5%] bg-cover bg-no-repeat bg-center flex flex-col items-center justify-center'>
        <h1 className='font-bold text-5xl selection:bg-[#ea1d2c] selection:text-white sm:mt-0 mt-10'>Faça suas compras por Aqui</h1>
        <p className='mt-2 text-lg text-gray-500 selection:bg-[#ea1d2c] selection:text-white'>Entregamos tudo o que precisa na porta da sua casa, de hortifruti a itens de limpeza</p>

        <form className='p-6 rounded-xl border border-gray-300 mt-20 max-w-[550px] w-full flex justify-between items-center'>
          <div className='w-full flex gap-2 items-center'>
            <IoSearchOutline size={20} className="red-icon" />
            <input type="text" placeholder='O que você está procurando?' className='outline-none w-full border-b border-neutral-200 max-w-[305px] p-1' autoComplete='off' onChange={(e) => buscar(e.target.value)} />
          </div>
          <Link href={`/busca/${search}`} className='sm:w-[200px] w-[100px] cursor-pointer sm:text-base text-sm bg-[#ee4c58] text-white p-2 rounded-xl text-center'>
            Buscar Itens
          </Link>
        </form>
      </section>

      <section className='w-full flex justify-center gap-8 mt-[50px] p-2 sm:p-0'>

        <div className='flex gap-20 sm:flex-nowrap flex-wrap'>
          <Link href={"/home"} className='bg-[#ea1d2c] p-10 rounded-xl flex flex-col sm:h-full cursor-pointer sm:w-[450px] transition-all duration-300 hover:scale-105'>
            <h1 className='text-white text-5xl font-bold'>Restaurantes</h1>
            <p className='text-sm text-white '>Veja opções de restaurantes próximos</p>
            <div className='flex items-end gap-12 w-full mt-8'>
              <div className='flex gap-4 w-full items-center'><h5 className='text-white text-lg'>Ver opções</h5><IoChevronForwardOutline size={20} className="white-icon" /></div>
              <img src="https://static.ifood-static.com.br/image/upload/f_auto/webapp/landingV2/restaurant.png" className='w-[200px]' alt="Card Image Photo" />
            </div>
          </Link>

          <Link href={"/home"} className='bg-[#b6d048] p-10 rounded-xl flex flex-col smh-full cursor-pointer sm:w-[450px] transition-all duration-300 hover:scale-105'>
            <h1 className='text-white text-5xl font-bold'>Mercado</h1>
            <p className='text-sm text-white'>Peça para entregarem as compras em sua casa</p>
            <div className='flex items-end gap-12 w-full mt-8'>
              <div className='flex gap-4 w-full items-center bg-[#9eb53e] p-2 rounded-xl'><h5 className='text-white text-lg'>Ver lojas</h5><IoChevronForwardOutline size={20} className="white-icon" /></div>
              <img src="https://static.ifood-static.com.br/image/upload/f_auto/webapp/landingV2/market.png" className='w-[200px]' alt="Card Image Photo" />
            </div>
          </Link>

        </div>
      </section>

      <section className='w-full flex flex-col items-center justify-center p-[2%]'>
        <div className='w-full max-w-[1500px]'>
          <h2 className='w-full mt-[100px] pt-16 pb-10 border-t border-neutral-300 text-3xl selection:bg-[#ea1d2c] selection:text-white'>
            Os melhores restaurantes
          </h2>
          <div className='sm:flex-nowrap flex-wrap flex gap-6'>
            <FeaturedRestaurant image='https://static.ifood-static.com.br/image/upload/t_thumbnail/logosgde/Logo%20McDonald_MCDON_DRIV15.jpg?imwidth=128' name="Mcdonalds's" branch='Lanches' verified={true} />
            <FeaturedRestaurant image='https://static.ifood-static.com.br/image/upload/t_thumbnail/logosgde/201910292243_94aaf166-84cc-4ebf-a35d-d223be34d01f.png?imwidth=64' name='Coco Bambu' branch='Frutos do mar' verified={true} />
            <FeaturedRestaurant image='https://static.ifood-static.com.br/image/upload/t_thumbnail/logosgde/201906182008_2b157a73-7564-4733-94c1-8d0376e7bb39.png?imwidth=64' name='Outback Steakhouse' branch='Australiana' verified={true} />
            <FeaturedRestaurant image='https://static.ifood-static.com.br/image/upload/t_thumbnail/logosgde/201801231937__HABIB_VERDE.jpg?imwidth=64' name="Habib's" branch='Culinária Árabe' verified={true} />
            <FeaturedRestaurant image='https://static.ifood-static.com.br/image/upload/t_thumbnail/logosgde/d4a3984f-2b73-4f46-99df-1d6bc79ff293/202001031317_CXpO_i.png?imwidth=64' name='China in Box' branch='Chinesa' verified={true} />
          </div>
        </div>
      </section>

      <section className='w-full flex flex-col items-center justify-center p-[2%]'>
        <div className='w-full max-w-[1500px]'>
          <h2 className='w-full mt-[50px] pt-16 pb-10 border-t border-neutral-300 text-3xl selection:bg-[#ea1d2c] selection:text-white'>
            Os melhores mercados
          </h2>
          <div className='flex gap-6 sm:flex-nowrap flex-wrap'>
            <FeaturedRestaurant image='https://static.ifood-static.com.br/image/upload/t_thumbnail/logosgde/0dbcb1e9-b354-4306-b0f7-d485ac655131/202004061634_lP8b_.jpeg?imwidth=64' name="DIA Supermercados" branch='Supermercado' verified={true} />
            <FeaturedRestaurant image='https://static.ifood-static.com.br/image/upload/t_thumbnail/logosgde/202010121938_31dbd467-bb46-4884-8879-e545789acc39.png?imwidth=64' name='Mercado BIG' branch='Supermercado' verified={true} />
            <FeaturedRestaurant image='https://static.ifood-static.com.br/image/upload/t_thumbnail/logosgde/595f29c3-3264-4e74-8089-cec0421420fb/202002101723_dmdz_i.jpg?imwidth=64' name='Eataly' branch='Supermercado' verified={true} />
          </div>
        </div>
      </section>

      <section className='flex justify-center gap-36 mt-[75px] w-full mb-[150px] sm:flex-nowrap flex-wrap p-2'>
        <div className='bg-[url("/assets/landing.svg")] bg-no-repeat bg-contain bg-center flex gap-8'>
          <img src="https://www.ifood.com.br/static/images/landing-v2/delivery-man.svg" className='w-[200px]' alt="Bottom Main Landing" />
          <div className='max-w-[250px] flex flex-col justify-center'>
            <h1 className='text-4xl h-full selection:bg-[#ea1d2c] selection:text-white'>Quer fazer entregas por aqui?</h1>
            <p className='mt-8 text-lg text-[#717171] h-full selection:bg-[#ea1d2c] selection:text-white'>Faça agora o seu cadastro de comece o quanto antes</p>
            <div className='bg-[#ea1d2c] text-white w-[150px] font-bold flex items-center justify-center p-4 rounded-xl tracking-wider cursor-pointer duration-300 transition-all hover:bg-[#ee4c58] mt-6'>Saiba Mais</div>
          </div>
        </div>

        <div className='bg-[url("/assets/landing.svg")] bg-no-repeat bg-contain bg-center flex gap-8'>
          <img src="https://www.ifood.com.br/static/images/landing-v2/store.svg" className='w-[200px]' alt="Bottom Main Landing" />
          <div className='max-w-[250px] flex flex-col justify-center'>
            <h1 className='text-4xl h-full selection:bg-[#ea1d2c] selection:text-white'>A sua fome de crescer está aqui</h1>
            <p className='mt-8 text-lg text-[#717171] h-full selection:bg-[#ea1d2c] selection:text-white'>Cadastre seu restaurante ou o seu mercado</p>
            <div className='bg-[#ea1d2c] text-white w-[150px] font-bold flex items-center justify-center p-4 rounded-xl tracking-wider cursor-pointer duration-300 transition-all hover:bg-[#ee4c58] mt-6'>Saiba Mais</div>
          </div>
        </div>
      </section>

      <section className='flex flex-col items-center justify-center w-p-[2%]'>
        <div className='border-t border-neutral-300 pt-[50px] max-w-[1500px] w-full flex justify-center gap-16 sm:flex-nowrap flex-wrap'>
          <div className='max-w-[200px] flex flex-col justify-center'>
            <h1 className='text-5xl selection:bg-[#ea1d2c] selection:text-white'>Você tem fome do quê?</h1>
            <p className='mt-12 text-[#717171] selection:bg-[#ea1d2c] selection:text-white'>Descubra como é ser um FoodLover e faça parte da nossa revolução!</p>
            <div className='bg-[#ea1d2c] text-white rounded-xl p-3 mt-6 cursor-pointer flex items-center justify-center text-lg'>
              Saiba Mais
            </div>
          </div>
          <img src="https://static.ifood-static.com.br/image/upload/t_high,q_100/webapp/landingV2/food-lover-banner.jpg" alt="Main Outdoor Image" />
        </div>
      </section>

      <section className='mt-[200px] mb-[150px] w-full sm:flex justify-center hidden'>
        <img src="https://static.ifood-static.com.br/image/upload/t_high,q_100/webapp/landingV2/ifood-benefits-desktop.png" alt="Logo" className='w-full max-w-[1250px] cursor-pointer' />
      </section>
    </div>
  )
}

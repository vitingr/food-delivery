import React from 'react'
import { MdOutlineEmail } from "react-icons/md";
import { MdLocalPhone } from "react-icons/md";
import { IoHome } from "react-icons/io5";

const page = () => {
  return (
    <div className='p-[5%] w-full flex flex-col items-center'>
      <h1 className='sm:text-2xl text-3xl font-semibold mb-20 mt-12 sm:mb-28 w-full max-w-[1500px] sm:text-left text-center'>Sobre o Food-Delivery</h1>


      <section className='max-w-[1200px]'>
        <div className='flex justify-between gap-10 w-full'>
          <div className='w-full flex flex-col items-center'>
            <img src="https://i.pinimg.com/originals/e8/03/16/e80316d006e91ff02f3b49e61a0051c0.png" alt="About image" className='w-[200px] selection:bg-transparent' />
          </div>
          <div className='w-full flex flex-col items-center'>
            <h2 className='text-2xl font-semibold text-center'>Quem somos?</h2>
            <p className='text-center text-[#717171] mt-4 text-lg'>Bem-vindo ao coração pulsante da gastronomia na palma da sua mão - Aqui, acreditamos que cada refeição é uma experiência e cada paladar merece ser celebrado. Nosso compromisso é proporcionar a você uma jornada culinária sem igual, conectando-o aos melhores restaurantes da cidade, sem que você precise sair do conforto do seu lar.</p>
          </div>
        </div>
        <div className='flex justify-between gap-12 w-full mt-[100px]'>
          <div className='w-full flex flex-col items-center'>
            <h2 className='text-2xl font-semibold text-center'>Nosso valores</h2>
            <p className='text-center text-[#717171] mt-4 text-lg'>Nós somos mais do que uma simples plataforma de delivery; somos apaixonados por conectar pessoas através da comida. Fundada em 2023, nossa missão é simplificar e enriquecer sua experiência gastronômica, oferecendo uma ampla seleção de restaurantes de alta qualidade e pratos que atendem a todos os gostos.</p>
          </div>
          <div className='w-full flex flex-col items-center'>
            <img src="https://www.creativefabrica.com/wp-content/uploads/2020/09/11/Pizza-Food-Delivery-Graphics-5437747-2-312x208.png" alt="About image" className='w-[200px] selection:bg-transparent' />
          </div>
        </div>
      </section>

      <section className='mt-[200px] max-w-[1200px]'>
        <h1 className='font-semibold text-2xl'>Envie uma mensagem <br /> ou sua <span className='text-[#ea1d2c] font-semibold text-2xl'>dúvida</span> para a gente</h1>

        <p className='mt-6 text-[#717171]'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eaque, eligendi asperiores! Ad architecto hic vel maxime magni! Dolores perspiciatis, aperiam tempore doloribus quae, iure dicta earum sed recusandae, exercitationem Dolores perspiciatis, aperiam tempore doloribus quae, iure dicta earum sed recusandae Dolores perspiciatis, aperiam tempore doloribus quae, iure dicta earum sed recusandae, exercitationem, exercitationem vitae.</p>

        <ul className='flex flex-col gap-2 list-none mt-6'>
          <li className='flex items-center gap-3'>
            <MdOutlineEmail size={20} className="gray-icon" />
            <span className='text-lg'>food_delivery@gmail.com</span>
          </li>
          <li className='flex items-center gap-3'>
            <MdLocalPhone size={20} className="gray-icon" />
            <span className='text-lg'>(+55) 19 99230-5419</span>
          </li>
          <li className='flex items-center gap-3'>
            <IoHome size={20} className="gray-icon" />
            <span className='text-lg'>Rua do Sashimi, 1321 - São Paulo, Brasil</span>
          </li>
        </ul>

        <div className='mt-14 flex flex-col items-center'>
          <div className='flex justify-between w-full gap-10'>
            <div className='w-full'>
              <label htmlFor="telephone" className='text-lg'>Seu nome</label>
              <input type="text" name="telephone" id="telephone" maxLength={80} className='w-full outline-none pl-4 pr-4 pt-2 pb-2 border border-neutral-200 rounded-lg mt-1 text-[#717171] mb-8' autoComplete='off' placeholder='Informe o seu nome' required />
            </div>
            <div className='w-full'>
              <label htmlFor="telephone" className='text-lg'>Email</label>
              <input type="text" name="telephone" id="telephone" maxLength={125} className='w-full outline-none pl-4 pr-4 pt-2 pb-2 border border-neutral-200 rounded-lg mt-1 text-[#717171] mb-8' autoComplete='off' placeholder='Digite o seu email' required />
            </div>
          </div>
          <div className='w-full'>
            <label htmlFor="mensage" className='text-lg'>Sua Mensagem</label>
            <textarea name="mensage" id="mensage" cols={30} rows={10} className='w-full outline-none pl-4 pr-4 pt-2 pb-2 border border-neutral-200 rounded-lg mt-1 text-[#717171] mb-8 resize-none' autoComplete='off' placeholder='Digite uma mensagem para a nossa equipe'></textarea>
          </div>
          <button className='cursor-pointer sm:text-base text-sm bg-[#ee4c58] text-white p-2 w-[200px] rounded-xl text-center'>
            Enviar Mensagem
          </button>
        </div>
      </section>
    </div>
  )
}

export default page
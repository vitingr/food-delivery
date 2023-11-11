import React from 'react'
import Popup from './Popup/Popup'
import { AvaliateProps } from '@/types/types'
import { AiFillStar } from 'react-icons/ai'
import ToastMessage from './Config/ToastMessage'
import { toast } from 'react-toastify'
import { infoUser } from '@/common/utils/userContext'

const Avaliate = ({ state, text, quantityStars, restaurantData, avaliationText }: AvaliateProps) => {

  const { data } = infoUser()

  const meses = [
    "janeiro", "fevereiro", "março", "abril", "maio", "junho",
    "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"
  ];

  const avaliateRestaurant = async () => {
    if (restaurantData && data.id !== undefined) {
      try {

        const newDate = new Date()

        const dia = newDate.getDate();
        const mes = meses[newDate.getMonth()];
        const ano = newDate.getFullYear();
        const hora = newDate.getHours();
        const minutos = newDate.getMinutes();

        const dataFormatada = `${dia} de ${mes} de ${ano} às ${hora}:${minutos}`;

        const response = await fetch("http://localhost:3001/avaliation/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user: data.id,
            restaurant: restaurantData.id,
            restaurantName: restaurantData.restaurantName,
            username: data.name,
            stars: Number(quantityStars),
            avaliationText: avaliationText,
            data: dataFormatada
          })
        })

        if (response.ok) {
          state(false)
          toast.success("Avaliação foi enviada")
        } else {
          toast.error("Não foi possível enviar a avaliação")
        }
      } catch (error) {
        toast.error("Não foi possível enviar a avaliação")
      }
    }
  }

  return (
    <Popup title='Avaliar Restaurante' state={state}>
      <ToastMessage />
      <div className='flex gap-2 items-center mt-10'>
        <h2 className='text-lg selection:bg-[#ea1d2c] selection:text-white'>Sua avaliação: </h2>
        <div className='flex gap-1'>
          {[...Array(quantityStars)].map((_, index) => (
            <AiFillStar key={index} size={20} className="gold-icon cursor-pointer" />
          ))}
        </div>
      </div>
      <form className='mt-12' onSubmit={(e: React.SyntheticEvent) => {
        e.preventDefault()
        avaliateRestaurant
      }}>
        <label htmlFor="avaliacao" className='text-lg selection:bg-[#ea1d2c] selection:text-white'>Qual sua opinião sobre esse restaurante?</label>
        <textarea name="avaliacao" id="avaliacao" minLength={2} maxLength={255} className='w-full outline-none pl-4 pr-4 pt-2 pb-2 border border-neutral-200 rounded-lg mt-1 text-[#717171] mb-8 selection:bg-[#ea1d2c] selection:text-white resize-none h-[125px]' autoComplete='off' placeholder='Digite a sua experiência com esse estabelecimento' onChange={(e) => text(e.target.value)} required></textarea>

        <button type='submit' className='mt-10 w-full bg-[#ea1d2c] rounded-xl p-4 text-center text-white font-bold cursor-pointer'>Enviar Avaliação</button>
      </form>
    </Popup>
  )
}

export default Avaliate
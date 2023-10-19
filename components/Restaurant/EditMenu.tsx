"use client"

import { EditMenu } from '@/types/types'
import React from 'react'
import Button from '../Button'
import ToastMessage from '../Config/ToastMessage'
import Menu from './EditItems/Menu'

const EditMenu = ({ currentSection, restaurantId }: EditMenu) => {
  return (
    <div className='p-16 w-full'>
      <ToastMessage />
      {currentSection === "ratings" ? (
        <div className='w-full'>
          <h1 className='text-center text-3xl font-bold'>Avaliações</h1>
        </div>
      ) : (<></>)}

      {currentSection === "purchases" ? (
        <div className='w-full'>
          <h1 className='text-center text-3xl font-bold'>Pedidos</h1>
        </div>
      ) : (<></>)}

      {currentSection === "menu" ? (
        <div className='w-full pl-12 pr-12'>
          <h1 className='text-center text-3xl font-bold'>Cardápio</h1>

          <Menu restaurantId={restaurantId} />

        </div>
      ) : (<></>)}

      {currentSection === "financial" ? (
        <div className='w-full'>
          <h1 className='text-center text-3xl font-bold'>Financeiro</h1>
        </div>
      ) : (<></>)}

      {currentSection === "time" ? (
        <div className='w-full'>
          <h1 className='text-center text-3xl font-bold'>Horários</h1>

          <Button text='Editar Horário' />
        </div>
      ) : (<></>)}

      {currentSection === "settings" ? (
        <div className='w-full'>
          <h1 className='text-center text-3xl font-bold'>Configurações</h1>

          <Button text='Editar Configurações' />
        </div>
      ) : (<></>)}
    </div >
  )
}

export default EditMenu
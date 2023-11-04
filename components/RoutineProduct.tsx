import { RoutineItemProps } from '@/types/types'
import React, { useEffect, useState } from 'react'
import { MdOutlineBookmarkRemove } from 'react-icons/md'
import ToastMessage from './Config/ToastMessage'
import { toast } from 'react-toastify'

const RoutineProduct = ({ day, dayValidator, product, getUserRoutine }: RoutineItemProps) => {

  const removeDayItem = async (id: string) => {
    try {
      const response = await fetch("http://localhost:3001/dayitem/remove", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          dayItemId: id
        })
      })

      if (response.ok) {
        getUserRoutine()
      } else {
        toast.error("Não foi possível remover o item da rotina")
      }
    } catch (error) {
      toast.error("Não foi possível remover o item da rotina")
    }
  }

  return day === dayValidator ? (
    <div className='pb-10 border-b border-neutral-200 w-full flex justify-between gap-6'>
      <ToastMessage />
      <div className='max-h-[65px] max-w-[65px]'>
        <img src={product.productFoto} alt="Product Foto" className='h-full w-full min-h-[65px] min-w-[65px]' />
      </div>
      <div className='w-full'>
        <div className='flex gap-2'>
          <h1 className='text-lg font-semibold selection:bg-[#ea1d2c] selection:text-white'>{product.deliveryHour}h00 - </h1>
          <h2 className='text-lg selection:bg-[#ea1d2c] selection:text-white'>{product.productName}, {product.restaurantName}</h2>
        </div>
        <div>
          <h1 className='text-[#717171] text-lg selection:bg-[#ea1d2c] selection:text-white'>Valor total: <span>{product.totalValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span></h1>
        </div>
      </div>
      <div onClick={() => removeDayItem(product.id)}>
        <MdOutlineBookmarkRemove size={25} className="gray-icon cursor-pointer" />
      </div>
    </div>
  ) : (
    <></>
  )
}

export default RoutineProduct
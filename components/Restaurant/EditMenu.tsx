"use client"

import { EditMenu } from '@/types/types'
import React, { useState } from 'react'
import Button from '../Button'
import Popup from '../Popup/Popup'
import ToastMessage from '../ToastMessage'
import { toast } from 'react-toastify'

const EditMenu = ({ currentSection, restaurantId }: EditMenu) => {

  const [createProductCategory, setCreateProductCategory] = useState<boolean>(false)

  const [categoryName, setCategoryName] = useState<string>("")
  const [categoryDescription, setCategoryDescription] = useState<string>("")

  const createCategory = async () => {
    if (categoryName !== "" && categoryDescription !== "") {
      try {

        const response = await fetch("http://localhost:3001/category/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            restaurant: restaurantId,
            categoryName: categoryName,
            categoryDescription: categoryDescription
          })
        })

        if (response.ok) {
          toast.success("Categoria Criada com Sucesso!")
          setCreateProductCategory(false)
        } else {
          toast.error("Não foi possível adicionar a categoria")
        }

      } catch (error) {
        console.log(error)
        toast.error("Não foi possível adicionar a categoria")
      }
    }
  }

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
        <div className='w-full'>
          <h1 className='text-center text-3xl font-bold'>Cardápio</h1>

          <div className='w-full flex flex-col items-center'>
            <p className='max-w-[425px] text-center text-[#717171] mt-10'>Para adicionar um item, primeiramente é necessário adicionar uma seção de categoria de produto</p>
          </div>

          <Button text='Adicionar Categoria' handleClick={() => setCreateProductCategory(true)} />
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

      {createProductCategory ? (
        <Popup title={"Adicionar Categoria"} state={setCreateProductCategory}>
          <form onSubmit={(e: React.SyntheticEvent) => {
            e.preventDefault()
            createCategory()
          }} className='mt-14'>

            <label htmlFor="nome" className='text-lg'>Nome da Categoria</label>
            <input type="text" name="nome" id="nome" minLength={2} maxLength={35} className='w-full outline-none pl-4 pr-4 pt-2 pb-2 border border-neutral-200 rounded-lg mt-1 text-[#717171] mb-8' autoComplete='off' placeholder='Exemplo: Bebidas, Acompanhamentos, Hamburguers' onChange={(e) => setCategoryName(e.target.value)} required />

            <label htmlFor="descricao" className='text-lg'>Descrição</label>
            <input type="text" name="descricao" id="descricao" minLength={2} maxLength={40} className='w-full outline-none pl-4 pr-4 pt-2 pb-2 border border-neutral-200 rounded-lg mt-1 text-[#717171] mb-8' autoComplete='off' placeholder='Descrição da categoria' onChange={(e) => setCategoryDescription(e.target.value)} required />

            {categoryName !== "" && categoryDescription !== "" ? (
              <button className='mt-12 w-full bg-[#ea1d2c] rounded-xl p-4 text-center text-white font-bold cursor-pointer' type='submit'>
                Criar Categoria
              </button>
            ) : (
              <button className='mt-12 w-full bg-[#dddddd] rounded-xl p-4 text-center text-[#717171] font-bold cursor-not-allowed'>Criar Categoria</button>
            )}

          </form>
        </Popup>
      ) : (<></>)
      }
    </div >
  )
}

export default EditMenu
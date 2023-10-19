"use client"

import { EditMenu } from '@/types/types'
import React, { useEffect, useState } from 'react'
import Button from '../Button'
import Popup from '../Popup/Popup'
import ToastMessage from '../Config/ToastMessage'
import { toast } from 'react-toastify'
import { IoAddOutline } from 'react-icons/io5'
import Upload from '../Config/Upload'

const EditMenu = ({ currentSection, restaurantId }: EditMenu) => {

  const [createProductCategory, setCreateProductCategory] = useState<boolean>(false)
  const [createProduct, setCreateProduct] = useState<boolean>(false)
  const [currentCategoryId, setCurrentCategoryId] = useState<string>("")

  const [categoryName, setCategoryName] = useState<string>("")
  const [categoryDescription, setCategoryDescription] = useState<string>("")
  const [productName, setProductName] = useState<string>("")
  const [productDescription, setProductDescription] = useState<string>("")
  const [productValue, setProductValue] = useState<string>("")
  const [productFoto, setProductFoto] = useState<any>("")

  const [categories, setCategories] = useState<any>([])
  const [products, setProducts] = useState<any>([])

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
          toast.success("Categoria criada com Sucesso!")
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

  const createNewProduct = async () => {
    if (productName !== "" && productValue !== "" && productDescription !== "" && productFoto !== "") {
      try {
        const response = await fetch("http://localhost:3001/product/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            restaurant: restaurantId,
            category: currentCategoryId,
            productName: productName,
            productDescription: productDescription,
            productValue: Number(productValue),
            productFoto: productFoto
          })
        })

        if (response.ok) {
          toast.success("Produto criado com Sucesso!")
          setCreateProduct(false)
        } else {
          toast.error("Não foi possível adicionar o produto")
        }
        
      } catch (error) {
        console.log(error)
        toast.error("Não foi possível adicionar o produto")
      }
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
      throw new Error("Não foi possível obter as categorias de produtos do restaurantes")
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

  const createProductAction = async (restaurantId: string) => {
    setCreateProduct(true)
    setCurrentCategoryId(restaurantId)
  }

  useEffect(() => {
    if (restaurantId !== undefined) {
      getRestaurantCategories(restaurantId)
    }
  }, [])

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

          {categories.length > 0 ? (
            <>
              {categories.map((category: {
                id: string,
                restaurant: string,
                categoryName: string,
                categoryDescription: string,
                quantityItems: number
              }) => (
                <div className='mt-[50px] p-6 border border-neutral-200 rounded-xl' key={category.id}>
                  <div>
                    <div className='flex items-end gap-2'>
                      <h2 className='font-bold text-2xl'>{category.categoryName}</h2>
                      {category.quantityItems === 0 ? <h5 className='text-sm mb-[1.5px]'>Categoria vazia</h5> : <h5 className='text-sm -m-1'>{category.quantityItems} itens na categoria</h5>}
                    </div>
                    <h6 className='text-base text-[#717171] mt-2'>{category.categoryDescription}</h6>
                  </div>
                  <div className='mt-8 pt-8 border-t border-neutral-200'>
                    Nenhum Produto Adicionado ainda!
                    <div className='mt-12 text-[#ea1d2c] border border-[#ea1d2c] max-w-[185px] flex items-center justify-center p-2 rounded-xl gap-2 cursor-pointer' onClick={() => createProductAction(category.id)}>
                      <IoAddOutline size={25} className="red-icon" />
                      Adicionar Produto
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <div className='w-full flex flex-col items-center'>
              <p className='max-w-[425px] text-center text-[#717171] mt-10'>Para adicionar um item, primeiramente é necessário adicionar uma seção de categoria de produto</p>
            </div>
          )}

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

      {createProduct ? (
        <Popup title={"Adicionar Produto"} state={setCreateProduct}>
          <form onSubmit={(e: React.SyntheticEvent) => {
            e.preventDefault()
            createNewProduct()
          }} className='mt-14'>

            <label htmlFor="nome" className='text-lg'>Nome do Produto</label>
            <input type="text" name="nome" id="nome" minLength={2} maxLength={35} className='w-full outline-none pl-4 pr-4 pt-2 pb-2 border border-neutral-200 rounded-lg mt-1 text-[#717171] mb-8' autoComplete='off' placeholder='Exemplo: Feijoada, Pastel, etc.' onChange={(e) => setProductName(e.target.value)} required />

            <label htmlFor="descricao" className='text-lg'>Descrição do Produto</label>
            <input type="text" name="descricao" id="descricao" minLength={2} maxLength={40} className='w-full outline-none pl-4 pr-4 pt-2 pb-2 border border-neutral-200 rounded-lg mt-1 text-[#717171] mb-8' autoComplete='off' placeholder='Descrição do seu produto oferecido' onChange={(e) => setProductDescription(e.target.value)} required />

            <label htmlFor="preco" className='text-lg'>Preço do Produto</label>
            <input type="number" name="preco" id="preco" className='w-full outline-none pl-4 pr-4 pt-2 pb-2 border border-neutral-200 rounded-lg mt-1 text-[#717171] mb-8' autoComplete='off' placeholder='Qual o preço do seu produto?' onChange={(e) => setProductValue(e.target.value)} required />

            <Upload setState={(value: any) => setProductFoto(value)} currentFoto={productFoto} />

            {productName !== "" && productValue !== "" && productDescription !== "" && productFoto !== "" ? (
              <button className='mt-12 w-full bg-[#ea1d2c] rounded-xl p-4 text-center text-white font-bold cursor-pointer' type='submit'>
                Criar Produto
              </button>
            ) : (
              <button className='mt-12 w-full bg-[#dddddd] rounded-xl p-4 text-center text-[#717171] font-bold cursor-not-allowed'>Criar Produto</button>
            )}

          </form>
        </Popup>
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
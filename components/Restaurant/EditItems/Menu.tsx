"use client"

import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { IoAddOutline } from 'react-icons/io5'
import Upload from '@/components/Config/Upload'
import Popup from '@/components/Popup/Popup'
import Button from '@/components/Button'
import { infoUser } from '@/common/utils/userContext'
import ToastMessage from '@/components/Config/ToastMessage'

const Menu = ({ restaurantId }: { restaurantId: string }) => {

  const { data } = infoUser()

  const [createProductCategory, setCreateProductCategory] = useState<boolean>(false)
  const [createProduct, setCreateProduct] = useState<boolean>(false)
  const [editProductCategory, setEditProductCategory] = useState<boolean>(false)
  const [currentProductCategory, setCurrentProductCategory] = useState<string>("")
  const [editRestaurantProduct, setEditRestaurantProduct] = useState(false)
  const [currentProductId, setCurrentProductId] = useState<string>("")

  const [currentCategoryId, setCurrentCategoryId] = useState<string>("")
  const [categoryName, setCategoryName] = useState<string>("")
  const [categoryDescription, setCategoryDescription] = useState<string>("")
  const [productName, setProductName] = useState<string>("")
  const [productDescription, setProductDescription] = useState<string>("")
  const [productValue, setProductValue] = useState<any>("")
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
          getRestaurantCategories(restaurantId)
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

  const editCategory = async (categoryId: string, categoryName: string, categoryDescription: string) => {
    setCategoryName(categoryName)
    setCategoryDescription(categoryDescription)
    setCurrentProductCategory(categoryId)

    setEditProductCategory(true)
  }

  const editProduct = async (productId: string, productDescription: string, productName: string, productValue: number, productFoto: string) => {
    setProductDescription(productDescription)
    setProductName(productName)
    setProductValue(productValue)
    setProductFoto(productFoto)
    setCurrentProductId(productId)

    setEditRestaurantProduct(true)
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
          setProductFoto("")
          getRestaurantProducts(restaurantId)
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

  const removeCategory = async (categoryId: string) => {
    if (categoryId) {
      try {
        const response = await fetch("http://localhost:3001/category/remove", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: categoryId
          })
        })

        if (response.ok) {
          toast.success("Categoria removida do seu cardápio")
          getRestaurantCategories(restaurantId)
        } else {
          toast.error("Não foi possível remover a categoria")
        }

      } catch (error) {
        console.log(error)
        toast.error("Não foi possível remover a categoria")
      }
    }
  }

  const updateCategory = async (categoryId: string) => {
    if (categoryId) {
      try {
        const response = await fetch("http://localhost:3001/category/update", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            id: categoryId,
            restaurant: restaurantId,
            categoryName: categoryName,
            categoryDescription: categoryDescription,
            quantityItems: Number(0)
          })
        })

        if (response.ok) {
          toast.success("Categoria editada com sucesso!")
          setEditRestaurantProduct(false)
          getRestaurantCategories(restaurantId)
        } else {
          toast.error("ERRO! Não foi possível editar a categoria")
        }

      } catch (error) {
        console.log(error)
        toast.error("ERRO! Não foi possível editar a categoria")
      }
    }
  }

  const removeProduct = async (productId: string) => {
    if (productId) {
      try {
        const response = await fetch(`"http://localhost:3001/product/remove`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            id: productId
          })
        })

        if (response.ok) {
          toast.success("Produto removido com sucesso")
          setEditRestaurantProduct(false)
          getRestaurantProducts(restaurantId)
        } else {
          toast.error("Não foi possível remover o produto")
        }

      } catch (error) {
        console.log(error)
        toast.error("Não foi possível remover o produto")
      }
    }
  }

  const updateProduct = async (productId: string) => {
    if (productId) {
      try {
        const response = await fetch("http://localhost:3001/product/update", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            id: productId,
            productName: productName,
            productDescription: productDescription,
            productValue: Number(productValue),
            productFoto: productFoto
          })
        })

        if (response.ok) {
          toast.success("Produto editado com sucesso")
          setEditRestaurantProduct(false)
          getRestaurantProducts(restaurantId)
        } else {
          toast.error("Não foi possível atualizar o produto")
        }

      } catch (error) {
        console.log(error)
        toast.error("Não foi possível atualizar o produto")
      }
    }
  }

  useEffect(() => {
    if (data.id !== undefined) {
      getRestaurantCategories(data.restaurantId)
    }
  }, [])

  return (
    <>
      <ToastMessage />
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
                <h6 className='text-base text-[#717171] mt-2 pb-6'>{category.categoryDescription}</h6>
              </div>
              <div className='border-t border-neutral-200'>
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
                      <div className='pt-8 pb-8 border-b border-neutral-200 flex justify-between gap-4'>
                        {currentProductId === product.id ? (
                          <>
                            {editRestaurantProduct ? (
                              <Popup title={"Editar Produto"} state={setEditRestaurantProduct}>
                                <form onSubmit={(e: React.SyntheticEvent) => {
                                  e.preventDefault()
                                  updateProduct(product.id)
                                }} className='mt-14 z-50 overflow-y-scroll h-full max-h-[500px] pr-10'>

                                  <label htmlFor="nome" className='text-lg'>Nome do Produto</label>
                                  <input type="text" name="nome" id="nome" minLength={2} maxLength={35} className='w-full outline-none pl-4 pr-4 pt-2 pb-2 border border-neutral-200 rounded-lg mt-1 text-[#717171] mb-8' autoComplete='off' placeholder='Exemplo: Feijoada, Pastel, etc.' onChange={(e) => setProductName(e.target.value)} defaultValue={product.productName} required />

                                  <label htmlFor="descricao" className='text-lg'>Descrição do Produto</label>
                                  <input type="text" name="descricao" id="descricao" minLength={2} maxLength={55} className='w-full outline-none pl-4 pr-4 pt-2 pb-2 border border-neutral-200 rounded-lg mt-1 text-[#717171] mb-8' autoComplete='off' placeholder='Descrição do seu produto oferecido' onChange={(e) => setProductDescription(e.target.value)} defaultValue={product.productDescription} required />

                                  <label htmlFor="preco" className='text-lg'>Preço do Produto</label>
                                  <input type="number" name="preco" id="preco" className='w-full outline-none pl-4 pr-4 pt-2 pb-2 border border-neutral-200 rounded-lg mt-1 text-[#717171] mb-8' autoComplete='off' placeholder='Qual o preço do seu produto?' onChange={(e) => setProductValue(e.target.value)} defaultValue={product.productValue} pattern="^\d*(\.\d{0,2})?$" step="0.01" required />

                                  <Upload setState={(value: any) => setProductFoto(value)} currentFoto={product.productFoto} styles='mt-[-565px]' />

                                  <button className='mt-12 w-full text-[#ea1d2c] rounded-xl p-4 text-center border border-[#ea1d2c] cursor-pointer' type='submit' onClick={() => removeProduct(product.id)}>
                                    Remover Produto
                                  </button>
                                  {productName !== "" && productValue !== "" && productDescription !== "" && productFoto !== "" ? (
                                    <button className='mt-6 w-full bg-[#ea1d2c] rounded-xl p-4 text-center text-white font-bold cursor-pointer z-50' type='submit'>
                                      Editar Produto
                                    </button>
                                  ) : (
                                    <button className='mt-6 w-full bg-[#dddddd] rounded-xl p-4 text-center text-[#717171] font-bold cursor-not-allowed'>Editar Produto</button>
                                  )}

                                </form>
                              </Popup>
                            ) : (<></>)}
                          </>
                        ) : (<></>)}
                        <img src={product.productFoto} alt="Product Foto" className='w-full max-w-[65px] max-h-[65px] h-full' />
                        <div className='w-full'>
                          <h1 className='font-bold'>{product.productName}</h1>
                          <h2 className='text-base'>{product.productDescription}</h2>
                          <p className='mt-2 text-sm text-[#717171]'>{product.productValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                        </div>
                        <div className='flex gap-4 max-h-[40px]'>
                          <div className='text-[#ea1d2c] border border-[#ea1d2c] w-[100px] flex items-center justify-center rounded-xl cursor-pointer' onClick={() => editProduct(product.id, product.productDescription, product.productName, product.productValue, product.productFoto)}>Editar</div>
                          <div className='bg-[#ea1d2c] text-white w-[100px] flex items-center justify-center rounded-xl cursor-pointer'>Remover</div>
                        </div>
                      </div>
                    ) : (<></>)}
                  </div>
                ))}
                <div className='flex justify-between items-center w-full mt-12'>
                  {editProductCategory ? (
                    <Popup title={"Editar Categoria"} state={setEditProductCategory}>
                      <form onSubmit={(e: React.SyntheticEvent) => {
                        e.preventDefault()
                        updateCategory(category.id)
                      }} className='mt-14 overflow-y-scroll max-h-[500px] pr-10'>

                        <label htmlFor="nome" className='text-lg'>Nome da Categoria</label>
                        <input type="text" name="nome" id="nome" minLength={2} maxLength={35} className='w-full outline-none pl-4 pr-4 pt-2 pb-2 border border-neutral-200 rounded-lg mt-1 text-[#717171] mb-8' autoComplete='off' placeholder='Exemplo: Bebidas, Acompanhamentos, Hamburguers' onChange={(e) => setCategoryName(e.target.value)} defaultValue={category.categoryName} required />

                        <label htmlFor="descricao" className='text-lg'>Descrição</label>
                        <input type="text" name="descricao" id="descricao" minLength={2} maxLength={55} className='w-full outline-none pl-4 pr-4 pt-2 pb-2 border border-neutral-200 rounded-lg mt-1 text-[#717171] mb-8' autoComplete='off' placeholder='Descrição da categoria' onChange={(e) => setCategoryDescription(e.target.value)} defaultValue={category.categoryDescription} required />

                        <button className='mt-12 w-full text-[#ea1d2c] rounded-xl p-4 text-center border border-[#ea1d2c] cursor-pointer' type='submit' onClick={() => removeCategory(category.id)}>
                          Remover Categoria
                        </button>
                        {categoryName !== "" && categoryDescription !== "" ? (
                          <button className='mt-6 w-full bg-[#ea1d2c] rounded-xl p-4 text-center text-white font-bold cursor-pointer z-50' type='submit'>
                            Editar Categoria
                          </button>
                        ) : (
                          <button className='mt-6 w-full bg-[#dddddd] rounded-xl p-4 text-center text-[#717171] font-bold cursor-not-allowed'>Editar Categoria</button>
                        )}
                      </form>
                    </Popup>
                  ) : (<></>)}
                  <div className='w-full'>
                    <div className=' text-[#ea1d2c] border border-[#ea1d2c] max-w-[185px] flex items-center justify-center p-2 rounded-xl gap-2 cursor-pointer w-full' onClick={() => createProductAction(category.id)}>
                      <IoAddOutline size={25} className="red-icon" />
                      Adicionar Produto
                    </div>
                  </div>
                  <div className='w-full flex justify-end text-[#ea1d2c] cursor-pointer underline-offset-4 underline' onClick={() => editCategory(category.id, category.categoryName, category.categoryDescription)}>
                    Editar Categoria
                  </div>
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

      {!editRestaurantProduct && !editProductCategory ? (
        <Button text='Adicionar Categoria' handleClick={() => setCreateProductCategory(true)} />
      ) : (
        <></>
      )}

      {createProduct ? (
        <Popup title={"Adicionar Produto"} state={setCreateProduct}>
          <form onSubmit={(e: React.SyntheticEvent) => {
            e.preventDefault()
            createNewProduct()
          }} className='mt-14 overflow-y-scroll max-h-[500px] pr-10'>

            <label htmlFor="nome" className='text-lg'>Nome do Produto</label>
            <input type="text" name="nome" id="nome" minLength={2} maxLength={35} className='w-full outline-none pl-4 pr-4 pt-2 pb-2 border border-neutral-200 rounded-lg mt-1 text-[#717171] mb-8' autoComplete='off' placeholder='Exemplo: Feijoada, Pastel, etc.' onChange={(e) => setProductName(e.target.value)} required />

            <label htmlFor="descricao" className='text-lg'>Descrição do Produto</label>
            <input type="text" name="descricao" id="descricao" minLength={2} maxLength={55} className='w-full outline-none pl-4 pr-4 pt-2 pb-2 border border-neutral-200 rounded-lg mt-1 text-[#717171] mb-8' autoComplete='off' placeholder='Ex: Ingredientes, temperatura, ponto da carne' onChange={(e) => setProductDescription(e.target.value)} required />

            <label htmlFor="preco" className='text-lg'>Preço do Produto</label>
            <input type="number" name="preco" id="preco" className='w-full outline-none pl-4 pr-4 pt-2 pb-2 border border-neutral-200 rounded-lg mt-1 text-[#717171] mb-8' autoComplete='off' placeholder='Qual o preço do seu produto?' onChange={(e) => setProductValue(e.target.value)} pattern="^\d*(\.\d{0,2})?$" step="0.01" required />

            <Upload setState={(value: any) => setProductFoto(value)} currentFoto={productFoto} styles='mt-[-565px]' />

            {productName !== "" && productValue !== "" && productDescription !== "" && productFoto !== "" ? (
              <button className='mt-12 w-full bg-[#ea1d2c] rounded-xl p-4 text-center text-white font-bold cursor-pointer z-50' type='submit'>
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
          }} className='mt-14 overflow-y-scroll max-h-[500px] pr-10'>

            <label htmlFor="nome" className='text-lg'>Nome da Categoria</label>
            <input type="text" name="nome" id="nome" minLength={2} maxLength={35} className='w-full outline-none pl-4 pr-4 pt-2 pb-2 border border-neutral-200 rounded-lg mt-1 text-[#717171] mb-8' autoComplete='off' placeholder='Exemplo: Bebidas, Acompanhamentos, Hamburguers' onChange={(e) => setCategoryName(e.target.value)} required />

            <label htmlFor="descricao" className='text-lg'>Descrição</label>
            <input type="text" name="descricao" id="descricao" minLength={2} maxLength={55} className='w-full outline-none pl-4 pr-4 pt-2 pb-2 border border-neutral-200 rounded-lg mt-1 text-[#717171] mb-8' autoComplete='off' placeholder='Descrição da categoria' onChange={(e) => setCategoryDescription(e.target.value)} required />

            {categoryName !== "" && categoryDescription !== "" ? (
              <button className='mt-12 w-full bg-[#ea1d2c] rounded-xl p-4 text-center text-white font-bold cursor-pointer z-50' type='submit'>
                Criar Categoria
              </button>
            ) : (
              <button className='mt-12 w-full bg-[#dddddd] rounded-xl p-4 text-center text-[#717171] font-bold cursor-not-allowed'>Criar Categoria</button>
            )}
          </form>
        </Popup>
      ) : (<></>)}
    </>
  )
}

export default Menu
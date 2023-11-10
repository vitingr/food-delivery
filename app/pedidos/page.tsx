"use client"

import { infoUser } from '@/common/utils/userContext'
import { AddressProps, ProductProps, PurchaseProps, RestaurantProps } from '@/types/types'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const page = () => {

  const { data: session, status } = useSession()
  const { data } = infoUser()

  const [purchases, setPurchases] = useState<PurchaseProps[]>([])
  const [products, setProducts] = useState<ProductProps[]>([])

  const getPurchases = async () => {
    try {
      const result = await fetch(`http://localhost:3001/purchase/${data.id}`)
      const response = await result.json()

      setPurchases(response)

    } catch (error) {
      console.log(error)
      throw new Error("Não foi possível obter os pedidos do restaurante")
    }
  }

  const getAllProducts = async () => {
    try {
      const requisition = await fetch('http://localhost:3001/product')
      const response = await requisition.json()
      setProducts(response)
    } catch (error) {
      console.log(error)
    }
  }

  const cancelPurchase = async (purchaseId: string) => {
    try {
      const response = await fetch(`http://localhost:3001/purchase/remove`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          purchaseId: purchaseId
        })
      })

      if (response.ok) {
        toast.success("Pedido cancelado")
        getPurchases()
      } else {
        toast.error("Não foi possível cancelar o pedido")
      }

    } catch (error) {
      console.log(error)
      toast.error("Não foi possível cancelar o pedido")
    }
  }

  useEffect(() => {
    if (data.id !== undefined && status === "authenticated") {
      getPurchases()
      getAllProducts()
    }
  }, [session, data])

  return (
    <div className='sm:p-[5%] p-[1%] w-full flex flex-col items-center'>
      <h1 className='selection:bg-[#ea1d2c] selection:text-white sm:text-2xl text-3xl font-semibold mb-20 mt-12 sm:mb-28 w-full max-w-[1500px] sm:text-left text-center'>Meus Pedidos</h1>

      {purchases.length > 0 ? (
        <div className='max-w-[1500px] p-[2%]'>
          {purchases.map((purchase: PurchaseProps) => (
            <div key={purchase.id} className='shadow-sm p-10 sm:w-[550px] w-[450px] border border-neutral-200 rounded-lg mb-20'>
              <div className='flex justify-between w-full'>
                <div className='w-full flex gap-4'>
                  <img src={purchase.restaurantLogo} className='w-[75px] h-[75px] rounded-xl' alt="Restaurant Logo" />
                  {purchase.takeOption === "Retirada" ? (
                    <div className='flex flex-col'>
                      <h1 className='font-semibold selection:bg-[#ea1d2c] selection:text-white'>{purchase.restaurantName}</h1>
                      <div>
                        <h2 className='selection:bg-[#ea1d2c] selection:text-white'>Retirar no restaurante</h2>
                        <h4 className='text-[#ea1d2c] text-sm mt-2 selection:bg-[#ea1d2c] selection:text-white'>Retirada</h4>
                        <h5 className='text-[#717171] text-sm mt-4 selection:bg-[#ea1d2c] selection:text-white'>N. Pedido: {purchase.id}</h5>
                      </div>
                    </div>
                  ) : (
                    <div className='flex flex-col'>
                      <h1 className='font-semibold selection:bg-[#ea1d2c] selection:text-white'>{purchase.restaurantName}</h1>
                      <div>
                        <h2 className='selection:bg-[#ea1d2c] selection:text-white'>{purchase.deliveryPlace}</h2>
                        <h4 className='text-[#ea1d2c] text-sm mt-2 selection:bg-[#ea1d2c] selection:text-white'>Entregar no endereço</h4>
                        <h5 className='text-[#717171] text-sm mt-4 selection:bg-[#ea1d2c] selection:text-white'>N. Pedido: {purchase.id}</h5>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className='mt-8 w-full flex justify-between'>
                <div className='w-full'>
                  <h1 className='text-[#717171] selection:bg-[#ea1d2c] selection:text-white'>Pagamento: {purchase.paymentMethod}</h1>
                  <h2 className='font-bold text-lg selection:bg-[#ea1d2c] selection:text-white'>Valor Total: </h2>
                </div>
                <div className='w-full flex flex-col items-end'>
                  <h1 className='text-[#717171] selection:bg-[#ea1d2c] selection:text-white'>Quantidade: {purchase.quantity} itens</h1>
                  <h2 className='font-bold text-lg selection:bg-[#ea1d2c] selection:text-white'>{(purchase.totalValue).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h2>
                </div>
              </div>

              <div className='mt-6'>
                <h3 className='font-semibold selection:bg-[#ea1d2c] selection:text-white'>Observações: <span className='text-[#717171] font-normal'>{purchase.commentaries}</span></h3>
              </div>

              <div className='w-full mt-4 p-8 border-t border-t-neutral-200 max-h-[400px] overflow-y-scroll'>
                <h2 className='mb-12 text-center text-xl font-semibold selection:bg-[#ea1d2c] selection:text-white'>O que você pediu</h2>
                {products.map((product) => (
                  <div className='flex flex-col w-full gap-6' key={product.id}>
                    {(purchase.products).includes(product.id) ? (
                      <div className='flex justify-between mb-8'>
                        <div className='max-w-[65px] max-h-[65px] flex justify-center'>
                          <img src={product.productFoto} alt="Product Photo" className='Product Image' />
                        </div>
                        <div className='w-full ml-4'>
                          <h1 className='text-lg font-semibold selection:bg-[#ea1d2c] selection:text-white'>{product.productName}</h1>
                          <h2 className='text-[#717171] selection:bg-[#ea1d2c] selection:text-white'>{product.productDescription}</h2>
                        </div>
                        <div className='ml-6 flex items-center'>
                          <p className='selection:bg-[#ea1d2c] selection:text-white'>{product.productValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                        </div>
                      </div>
                    ) : (<></>)}
                  </div>
                ))}
              </div>

              <div className='bg-[#ea1d2c] text-white p-4 mt-6 text-base sm:text-xl font-bold text-center rounded-xl cursor-pointer' onClick={() => cancelPurchase(purchase.id)}>
                Cancelar Pedido
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className='max-w-[1500px] flex flex-col items-center'>
          <h1 className='font-semibold selection:bg-[#ea1d2c] selection:text-white text-center'>Você ainda não pediu nada</h1>
          <h3 className='mt-4 text-[#717171] selection:bg-[#ea1d2c] selection:text-white text-center'>Que tal conhecer as melhores opções na sua região?</h3>
          <Link className='mt-14 font-semibold text-[#ea1d2c] selection:bg-[#ea1d2c] selection:text-white text-center' href="/home">
            Ir para o início
          </Link>
        </div>
      )}
    </div>
  )
}

export default page
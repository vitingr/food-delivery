"use client"

import { infoUser } from '@/common/utils/userContext'
import ToastMessage from '@/components/Config/ToastMessage'
import { AddressProps, ProductProps, PurchaseProps, RestaurantData } from '@/types/types'
import React, { useEffect, useState } from 'react'

const Purchases = ({ restaurantId, restaurantData }: { restaurantId: string, restaurantData: RestaurantData }) => {

  const { data } = infoUser()

  const [purchases, setPurchases] = useState<PurchaseProps[]>([])
  const [products, setProducts] = useState<ProductProps[]>([])
  const [addresses, setAddresses] = useState<AddressProps[]>([])

  const getPurchases = async () => {
    try {
      const result = await fetch(`http://localhost:3001/purchase/restaurantPurchases/${restaurantId}`)
      const response = await result.json()

      setPurchases(response)

    } catch (error) {
      console.log(error)
      throw new Error("Não foi possível obter os pedidos do restaurante")
    }
  }

  const getRestaurantProducts = async () => {
    try {
      const requisition = await fetch(`http://localhost:3001/product/${restaurantId}`)
      const response = await requisition.json()

      setProducts(response)

    } catch (error) {
      console.log(error)
      throw new Error("Não foi possível obter os produtos do restaurante")
    }
  }

  const getAddresses = async () => {
    try {
      const requisition = await fetch(`http://localhost:3001/address`)
      const response = await requisition.json()

      setAddresses(response)

    } catch (error) {
      console.log(error)
      throw new Error("Não foi possível obter os endereços dos pedidos")
    }
  }

  useEffect(() => {
    if (restaurantId) {
      getPurchases()
      getRestaurantProducts()
      getAddresses()
    }
  }, [])

  return (
    <div className='max-w-[550px]'>
      <ToastMessage />
      {purchases.map((purchase: PurchaseProps) => (
        <div key={purchase.id} className='shadow-sm p-6 border border-neutral-200 rounded-lg'>
          <div className='w-full flex justify-between'>
            <div className='w-full'>
              <h1 className='font-bold text-lg selection:bg-[#ea1d2c] selection:text-white'>Detalhes do Pedido</h1>
              <h6 className='text-sm selection:bg-[#ea1d2c] selection:text-white'>{purchase.deliveryTime}</h6>
            </div>
            <div className='w-full flex justify-end'>
              {purchase.delivered ? (
                <h1 className="text-green-700">Pedido entregue</h1>
              ) : (
                <h1 className="text-[#ea1d2c]">Pedido em aberto</h1>
              )}
            </div>
          </div>
          <div className='flex justify-between mt-8'>
            <div className='w-full flex gap-4'>
              <img src={restaurantData.logo} className='w-[80px] h-[80px]' alt="Restaurant Logo" />
              {addresses.map((address: AddressProps) => (
                <div key={address.id}>
                  {purchase.takeOption === "Retirada" ? (
                    <div>
                      <h2 className='font-semibold selection:bg-[#ea1d2c] selection:text-white'>{restaurantData.street} - {restaurantData.address}</h2>
                      <h3 className='text-[#717171] text-sm selection:bg-[#ea1d2c] selection:text-white'>{restaurantData.city}, {restaurantData.state}</h3>
                      <h4 className='text-[#ea1d2c] text-sm mt-2 selection:bg-[#ea1d2c] selection:text-white'>Retirar no restaurante</h4>
                    </div>
                  ) : (<></>)}
                  {address.id === purchase.deliveryAddress ? (
                    <div>
                      <h2 className='font-semibold selection:bg-[#ea1d2c] selection:text-white'>{address.street} - {address.address}</h2>
                      <h3 className='text-[#717171] text-sm selection:bg-[#ea1d2c] selection:text-white'>{address.city}, {address.state}</h3>
                      <h4 className='text-[#ea1d2c] text-sm mt-2 selection:bg-[#ea1d2c] selection:text-white'>Entregar no endereço</h4>
                    </div>
                  ) : (<></>)}
                </div>
              ))}
            </div>
            <div className='w-full flex justify-end'>
              <h6 className='text-sm text-[#717171] selection:bg-[#ea1d2c] selection:text-white'>Pedido {purchase.id}</h6>
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
            <h2 className='mb-12 text-center text-xl font-semibold selection:bg-[#ea1d2c] selection:text-white'>Pedidos do Cliente</h2>
            {products.map((product) => (
              <div className='flex flex-col w-full gap-6'>
                {(purchase.products).includes(product.id) ? (
                  <div className='flex justify-between mb-8'>
                    <div className='max-w-[65px] max-h-[65px] flex justify-center'>
                      <img src={product.productFoto} alt="Product Photo" className='Product Image' />
                    </div>
                    <div className='w-full ml-4'>
                      <h1 className='text-lg font-semibold'>{product.productName}</h1>
                      <h2 className='text-[#717171]'>{product.productDescription}</h2>
                    </div>
                    <div className='ml-6 flex items-center'>
                      <p>{product.productValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                    </div>
                  </div>
                ) : (<></>)}
              </div>
            ))}
          </div>

          <div className='bg-[#ea1d2c] text-white p-4 mt-6 text-xl font-bold text-center rounded-xl cursor-pointer'>
            Finalizar Pedido
          </div>
        </div>
      ))}
    </div>
  )
}

export default Purchases
"use client"

import { infoUser } from '@/common/utils/userContext'
import Button from '@/components/Button'
import ToastMessage from '@/components/Config/ToastMessage'
import Popup from '@/components/Popup/Popup'
import RoutineProduct from '@/components/RoutineProduct'
import { routineHours, routineOptions } from '@/constants/routine'
import { DayItemProps, ProductProps, ScheduleProps, WeekDayProps } from '@/types/types'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const page = () => {

  // Imports sessions
  const { data, getInfo } = infoUser()
  const { data: session, status } = useSession()

  // Variáveis da rotina do usuário
  const [schedule, setSchedule] = useState<ScheduleProps[]>([])
  const [weekDays, setWeekDays] = useState<WeekDayProps[]>([])
  const [dayItems, setDayItems] = useState<DayItemProps[] | any>([])
  const [favorites, setFavorites] = useState<ProductProps[]>([])

  // Fetch Params
  const [day, setDay] = useState<string>("")
  const [product, setProduct] = useState<string>("")
  const [quantityItems, setQuantityItems] = useState<number>(1)
  const [totalValue, setTotalValue] = useState<number>(0)
  const [hour, setHour] = useState<string>("")

  // Product Info
  const [productValue, setProductValue] = useState<any>(0)
  const [productFoto, setProductFoto] = useState<any>("https://icones.pro/wp-content/uploads/2021/04/icone-de-nourriture-hamburger-gris.png")
  const [restaurant, setRestaurant] = useState<any>("")
  const [productName, setProductName] = useState<any>("")

  // Conditioners Popup
  const [showCreatingDayItem, setShowCreatingDayItem] = useState<boolean>(false)

  const getUserFavorites = async () => {
    try {
      const requisition = await fetch(`http://localhost:3001/product/getRestaurantProducts/${data.favorites}`)
      const response = await requisition.json()
      setFavorites(response)
    } catch (error) {
      throw new Error("ERRO! Não foi possível encontrar os pratos favoritos")
    }
  }

  const getUserSchedule = async () => {
    if (data.id) {
      try {
        const requisition = await fetch(`http://localhost:3001/schedule/${data.id}`)
        const response = await requisition.json()
        if (response.length > 0) {
          setSchedule(response)
        } else {
          try {
            await fetch("http://localhost:3001/schedule/create", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                userId: data.id
              })
            })
          } catch (error) {
            throw new Error("ERRO! não foi possível criar o schedule")
          }
        }
      } catch (error) {
        throw new Error("ERRO! não foi possível obter os schedules")
      }
    }
  }

  const getUserRoutine = async () => {
    try {
      const weekRequisition = await fetch(`http://localhost:3001/weekday/${data.id}`)
      const weekResponse = await weekRequisition.json()
      setWeekDays(weekResponse)

      const dayRequisition = await fetch(`http://localhost:3001/dayitem/${data.id}`)
      const dayResponse = await dayRequisition.json()
      setDayItems(dayResponse)

    } catch (error) {
      throw new Error("ERRO! não foi possível obter a rotina do usuário")
    }
  }

  const createDayItem = async () => {
    try {
      const requisition = await fetch(`http://localhost:3001/restaurant/${restaurant}`)
      const result = await requisition.json()
      let restaurantName = result.restaurantName

      if (restaurantName) {
        const response = await fetch("http://localhost:3001/dayitem/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: data.id,
            day: day,
            restaurant: restaurant,
            restaurantName: restaurantName,
            productId: product,
            productFoto: productFoto,
            quantityItems: Number(quantityItems),
            totalValue: Number(productValue * quantityItems),
            deliveryHour: Number(hour),
            productName: productName
          })
        })

        if (response.ok) {
          getUserRoutine()
          setShowCreatingDayItem(false)

          setProductFoto("https://icones.pro/wp-content/uploads/2021/04/icone-de-nourriture-hamburger-gris.png")
          setProductValue(0)
          setProduct("")
          setHour("")
          setQuantityItems(0)
          setDay("")
          setProductName("")
          toast.success("O produto foi adicionado a sua rotina")
        } else {
          toast.error("ERRO! Não foi possível adicionar a rotina")
        }
      }
    } catch (error) {
      toast.error("ERRO! Não foi possível adicionar a rotina")
    }
  }

  useEffect(() => {
    if (data.id !== undefined && status === "authenticated") {
      getUserFavorites()
      getUserSchedule()
    }
  }, [status, data])

  useEffect(() => {
    if (data.id !== undefined && status === "authenticated") {
      getUserRoutine()
    }
  }, [schedule])

  return (
    <div className='p-[5%] w-full flex flex-col items-center'>
      <ToastMessage />
      <h1 className='selection:bg-[#ea1d2c] selection:text-white sm:text-2xl text-3xl font-semibold mb-20 mt-12 sm:mb-28 w-full max-w-[1500px] sm:text-left text-center'>Meus Perfil</h1>
      {dayItems.length > 0 ? (
        <div className='max-w-[750px] w-full flex flex-col gap-8'>
          <div className='border border-neutral-200 p-10 rounded-xl w-full'>
            <h1 className='text-2xl font-semibold mb-16 selection:bg-[#ea1d2c] selection:text-white'>Segunda-Feira</h1>
            <div className='flex flex-col gap-6'>
              {dayItems.map((item: DayItemProps) => (
                <RoutineProduct day="Segunda-Feira" dayValidator={item.day} key={item.id} product={item} getUserRoutine={getUserRoutine } />
              ))}
            </div>
          </div>

          <div className='border border-neutral-200 p-10 rounded-xl w-full'>
            <h1 className='text-2xl font-semibold mb-16 selection:bg-[#ea1d2c] selection:text-white'>Terça-Feira</h1>
            <div className='flex flex-col gap-6'>
              {dayItems.map((item: DayItemProps) => (
                <RoutineProduct day="Terça-Feira" dayValidator={item.day} key={item.id} product={item} getUserRoutine={getUserRoutine} />
              ))}
            </div>
          </div>

          <div className='border border-neutral-200 p-10 rounded-xl w-full'>
            <h1 className='text-2xl font-semibold mb-16 selection:bg-[#ea1d2c] selection:text-white'>Quarta-Feira</h1>
            <div className='flex flex-col gap-6'>
              {dayItems.map((item: DayItemProps) => (
                <RoutineProduct day="Quarta-Feira" dayValidator={item.day} key={item.id} product={item} getUserRoutine={getUserRoutine} />
              ))}
            </div>
          </div>

          <div className='border border-neutral-200 p-10 rounded-xl w-full'>
            <h1 className='text-2xl font-semibold mb-16 selection:bg-[#ea1d2c] selection:text-white'>Quinta-Feira</h1>
            <div className='flex flex-col gap-6'>
              {dayItems.map((item: DayItemProps) => (
                <RoutineProduct day="Quinta-Feira" dayValidator={item.day} key={item.id} product={item} getUserRoutine={getUserRoutine} />
              ))}
            </div>
          </div>

          <div className='border border-neutral-200 p-10 rounded-xl w-full'>
            <h1 className='text-2xl font-semibold mb-16 selection:bg-[#ea1d2c] selection:text-white'>Sexta-Feira</h1>
            <div className='flex flex-col gap-6'>
              {dayItems.map((item: DayItemProps) => (
                <RoutineProduct day="Sexta-Feira" dayValidator={item.day} key={item.id} product={item} getUserRoutine={getUserRoutine} />
              ))}
            </div>
          </div>

          <div className='border border-neutral-200 p-10 rounded-xl w-full'>
            <h1 className='text-2xl font-semibold mb-16 selection:bg-[#ea1d2c] selection:text-white'>Sábado</h1>
            <div className='flex flex-col gap-6'>
              {dayItems.map((item: DayItemProps) => (
                <RoutineProduct day="Sábado" dayValidator={item.day} key={item.id} product={item} getUserRoutine={getUserRoutine} />
              ))}
            </div>
          </div>

          <div className='border border-neutral-200 p-10 rounded-xl w-full'>
            <h1 className='text-2xl font-semibold mb-16 selection:bg-[#ea1d2c] selection:text-white'>Domingo</h1>
            <div className='flex flex-col gap-6'>
              {dayItems.map((item: DayItemProps) => (
                <RoutineProduct day="Domingo" dayValidator={item.day} key={item.id} product={item} getUserRoutine={getUserRoutine} />
              ))}
            </div>
          </div>

          {showCreatingDayItem ? (<></>) : (
            <Button text='Alterar Programação' handleClick={() => setShowCreatingDayItem(true)} />
          )}
        </div>
      ) : (
        <div className='max-w-[750px] flex flex-col items-center'>
          <h1 className='font-semibold text-xl selection:bg-[#ea1d2c] selection:text-white text-center'>Você ainda não tem uma rotina de pedidos</h1>
          <h3 className='mt-4 text-[#717171] selection:bg-[#ea1d2c] selection:text-white text-center'>Com o Food Delivery é possível reservar a sua comida em um restaurante automaticamente. Basta você determinar um dia e horário para que a rotina seja executada semanalmente, para adicionar uma, clique abaixo.</h3>
          {showCreatingDayItem ? (<></>) : (
            <Button text='Bora lá' handleClick={() => setShowCreatingDayItem(true)} />
          )}
        </div>
      )}

      {showCreatingDayItem ? (
        <Popup title="Adicionar um item a Rotina" state={setShowCreatingDayItem} handleSubmit={() => {
          setProductFoto("https://icones.pro/wp-content/uploads/2021/04/icone-de-nourriture-hamburger-gris.png")
          setProductValue(0)
          setProduct("")
          setHour("")
          setQuantityItems(0)
          setDay("")
        }}>
          <form onSubmit={(e: React.SyntheticEvent) => {
            e.preventDefault()
            createDayItem()
          }} className='mt-14 z-50 overflow-y-scroll max-h-[750px] pr-10'>
            <label htmlFor="dia" className='text-lg selection:bg-[#ea1d2c] selection:text-white'>Dia da semana</label>
            <select name="dia" id="dia" className='w-full outline-none pl-4 pr-4 pt-2 pb-2 border border-neutral-200 rounded-lg mt-1 text-[#717171] mb-8' onChange={(e) => setDay(e.target.value)} required>
              <option value="">Selecione um dia da semana</option>
              {routineOptions.map((day) => (
                <option value={day.value} key={day.title}>{day.title}</option>
              ))}
            </select>

            {JSON.stringify(restaurant)}

            <label htmlFor="dia" className='text-lg selection:bg-[#ea1d2c] selection:text-white'>Produto a reservar</label>
            <div className='flex gap-6 mt-2'>
              <img src={productFoto} className='w-[65px] h-[65px]' alt="Product Image" />
              <select name="dia" id="dia" className='w-full outline-none pl-4 pr-4 pt-2 pb-2 border border-neutral-200 rounded-lg mt-1 text-[#717171] mb-8' onChange={(e) => {
                setProductFoto(e.target.options[e.target.selectedIndex].getAttribute('data-productfoto'))
                setProductValue(e.target.options[e.target.selectedIndex].getAttribute('data-value'))
                setRestaurant(e.target.options[e.target.selectedIndex].getAttribute('data-restaurant'))
                setProductName(e.target.options[e.target.selectedIndex].getAttribute('data-productname'))
                setProduct(e.target.value)
              }} required>
                <option value="" data-productfoto={"https://icones.pro/wp-content/uploads/2021/04/icone-de-nourriture-hamburger-gris.png"}>Escolha o produto</option>
                {favorites.map((favorite: ProductProps) => (
                  <option value={favorite.id} key={favorite.id} data-productfoto={favorite.productFoto} data-value={favorite.productValue} data-restaurant={favorite.restaurant} data-productname={favorite.productName}>{favorite.productName}</option>
                ))}
              </select>
            </div>

            <div className='w-full flex gap-2 justify-between mt-8 mb-12'>
              <div className='flex items-center border border-neutral-200 rounded-lg pl-2 pr-2'>
                <div className='cursor-pointer text-xl border-r border-neutral-200 pr-3 pl-1 selection:bg-[#ea1d2c] selection:text-white' onClick={() => {
                  if (quantityItems > 1) {
                    setQuantityItems(quantityItems - 1)
                  }
                }}>-</div>
                <div className='text-xl pr-3 pl-3 selection:bg-[#ea1d2c] selection:text-white'>{quantityItems}</div>
                <div className='cursor-pointer text-xl border-l border-neutral-200 pl-3 pr-1 selection:bg-[#ea1d2c] selection:text-white' onClick={() => {
                  if (quantityItems < 99) {
                    setQuantityItems(quantityItems + 1)
                  }
                }}>+</div>
              </div>
              <div>
                <h1 className='text-lg font-bold'>Valor total</h1>
                <h2 className='text-[#717171] text-right'>{(quantityItems * productValue).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h2>
              </div>
            </div>

            <label htmlFor="dia" className='text-lg selection:bg-[#ea1d2c] selection:text-white'>Horário do Dia</label>
            <select name="dia" id="dia" className='w-full outline-none pl-4 pr-4 pt-2 pb-2 border border-neutral-200 rounded-lg mt-1 text-[#717171] mb-8' onChange={(e) => setHour(e.target.value)} defaultValue={day} required>
              <option value="">Selecione um horário</option>
              {routineHours.map((hour) => (
                <option value={hour.value} key={hour.title}>{hour.title}</option>
              ))}
            </select>

            {day !== "" && totalValue >= 0 && quantityItems >= 1 && hour !== "" && product !== "" ? (
              <button className='mt-28 w-full border text-white bg-[#ea1d2c] rounded-xl p-4 text-center font-bold cursor-pointer' type='submit'>Adicionar Rotina</button>
            ) : (
              <button className='mt-28 w-full bg-[#dddddd] rounded-xl p-4 text-center text-[#717171] font-bold cursor-not-allowed' type='submit'>Adicionar Rotina</button>
            )}

          </form>
        </Popup>
      ) : (<></>)}
    </div>

    // 1 - Sistema terá um botão inicial para começar a agendar pedidos
    // 2 - A cada clique criara um novo item no banco de dados chamado programação (cada programação irá pertencer a um dia da semana ao respectivo usuário)
    // 3 - Após isso irá aparecer a segunda opçao, na qual ele irá selecionar um pedido dos favoritos para adicionar a sua agenda semanal.
    // 4 - Irá gerar um flex-col com cada um dos 7 dias da semana e suas respectivas programações, e dentro de cada uma uma lista com os horários com os pedidos referentes ao determinado dia
  )
}

export default page
"use client"

import Link from 'next/link'
import React, { useState } from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'
import { IoBagOutline, IoMenuOutline, IoTicketOutline, IoSettingsOutline, IoHelpBuoyOutline, IoStorefrontOutline, IoCalendarOutline, IoHomeOutline } from 'react-icons/io5'
import { AiOutlineHeart } from 'react-icons/ai'
import { BsTicketPerforated } from 'react-icons/bs'
import { VscSignOut } from 'react-icons/vsc'
import { infoUser } from '@/common/utils/userContext'
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

const Navbar = () => {

  const { data: session, status } = useSession()

  const { data, getInfo } = infoUser()

  const [showMenu, setShowMenu] = useState<Boolean>(false)

  const driverObj = driver({
    showProgress: true,
    popoverClass: 'driverjs-theme',
    steps: [
      { element: '#home', popover: { title: 'Conheça o nosso menu', description: 'Apresentaremos a você todas as funcionalidades de nosso site! Esperamos que você goste e aproveite ao máximo', side: "left", align: 'start' } },
      { element: '#purchases', popover: { title: 'Seus Pedidos', description: 'Aqui é possível consultar todos o seus pedidos em nossa plataforma', side: "bottom", align: 'start' } },
      { element: '#coupons', popover: { title: 'Cupons do Usuário', description: 'Aqui você pode explorar e conferir quantos cupons você possui, você pode usa-los em suas compras!', side: "bottom", align: 'start' } },
      { element: '#favorites', popover: { title: 'Aba de Favoritos', description: 'Agora você pode salvar seus pratos favoritos nessa seção! Assim você economiza tempo buscando alguma opção.', side: "left", align: 'start' } },
      { element: '#profile', popover: { title: 'Seu Perfil', description: 'Aqui você ver suas informações, editar seus dados pessoais, foto, nome, e muito mais referente a customização!', side: "top", align: 'start' } },
      { element: '#routine', popover: { title: 'Rotinas Semanais', description: 'Você não precisa mais se preocupar em parar suas atividades para pedir algo para comer! Agora você pode montar uma rotina de pedidos semanais, ou seja, são pedidos programados para serem reservados para você em determinados dias e horas da semana.', side: "right", align: 'start' } },
      { popover: { title: 'Bom Apetite!', description: 'E é isso! Explore as mais diversas variedades de pratos e restaurantes, desejamos uma boa experiência.' } }
    ]
  })

  const viewMenu = async () => {
    try {
      const response = await fetch("http://localhost:3001/user/viewMenu", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: data.id
        })
      })

      if (response.ok) {
        getInfo()
      }
    } catch (error) { 
      console.log(error)
    }
  }

  return (
    <div className='p-8 sm:p-2 justify-around items-center w-full flex fixed bg-white z-10'>
      <Link href="/" className='sm:w-full flex justify-center'>
        <img src="/assets/logo.png" className='max-w-[75px] sm:max-w-[100px] selection:bg-transparent' alt="Logo Image" />
      </Link>
      <ul className='ml-14 list-none gap-14 w-full justify-center hidden lg:flex'>
        <Link href="/"><li className='duration-300 transition-all hover:text-[#ea1d2c] selection:bg-[#ea1d2c] selection:text-white'>Início</li></Link>
        <Link href="/home"><li className='duration-300 transition-all hover:text-[#ea1d2c] selection:bg-[#ea1d2c] selection:text-white'>Restaurantes</li></Link>
        <Link href="/home"><li className='duration-300 transition-all hover:text-[#ea1d2c] selection:bg-[#ea1d2c] selection:text-white'>Mercados</li></Link>
        <Link href="/cupons"><li className='duration-300 transition-all hover:text-[#ea1d2c] selection:bg-[#ea1d2c] selection:text-white'>Cupons</li></Link>
        <Link href="/"><li className='duration-300 transition-all hover:text-[#ea1d2c] selection:bg-[#ea1d2c] selection:text-white'>Informações</li></Link>
        <Link href="/"><li className='duration-300 transition-all hover:text-[#ea1d2c] selection:bg-[#ea1d2c] selection:text-white'>Sobre</li></Link>
      </ul>

      {session?.user?.email ? (
        <div className='w-full flex items-center gap-4 sm:ml-20 justify-end sm:justify-start'>
          <img src={data.photo || ""} className='w-[40px] h-[40px] duration-200 transition-all hover:scale-110 cursor-pointer rounded-full selection:bg-transparent' alt="Profile Image" />
          <div className='flex items-center justify-center gap-2 transition-all duration-300 rounded-full hover:bg-[#b1b4b415] pl-6 pr-6 w-[125px] cursor-pointer'>
            <IoBagOutline size={35} className="red-icon" />
            <div className='w-full'>
              {data.money > 0 ? <h5 className='text-[12px] selection:bg-[#ea1d2c] selection:text-white'>{data.money.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h5> : <h5 className='text-[12px] selection:bg-[#ea1d2c] selection:text-white'>R$ 0,00</h5>}
              <p className='text-[11px] text-[#717171] mt-[-3.5px] selection:bg-[#ea1d2c] selection:text-white'>0 itens</p>
            </div>
          </div>
          <div className='flex items-center' onClick={() => {
            setShowMenu(!showMenu)
            if (!data.driverMenu) {
              viewMenu()
              driverObj.drive()
            }
          }}>
            <IoMenuOutline size={30} className="cursor-pointer" />
            {showMenu ? (
              <div className='z-20 fixed right-0 bg-[#fff] shadow-md h-[750px] w-[350px] border border-[#f7f7f7] translate-y-2 transition-all rounded-lg mt-[800px] lg:left-[64%]'>
                <div className='p-10'>
                  <h1 className='text-3xl font-bold text-center selection:bg-[#ea1d2c] selection:text-white'>Olá, {session?.user?.name}</h1>
                </div>
                <div className='w-full flex gap-4 p-6 bg-[#f7f7f7] items-center'>
                  <img src="https://cdn-icons-png.flaticon.com/512/6075/6075725.png" className='w-[50px] h-[50px] selection:bg-transparent' alt="Cellphone Image" />
                  <div>
                    <h4 className='text-sm font-bold selection:bg-[#ea1d2c] selection:text-white'>Ative as notificações</h4>
                    <p className='text-sm text-[#717171] selection:bg-[#ea1d2c] selection:text-white'>Acompanhe de perto o andamento dos seus pedidos, promoções e novidades</p>
                    <h2 className='mt-6 text-[#ea1d2c] font-bold text-sm selection:bg-[#ea1d2c] selection:text-white'>Ativar</h2>
                  </div>
                </div>
                <div className='p-10 gap-8 w-full flex flex-col'>
                  <Link href={"/home"} className='flex w-full justify-between items-center gap-8 cursor-pointer' id='home'>
                    <IoHomeOutline size={30} className="gray-icon" />
                    <h3 className='text-[#717171] w-full text-lg selection:bg-[#ea1d2c] selection:text-white'>Início</h3>
                  </Link>
                  <Link href={"/pedidos"} className='flex w-full justify-between items-center gap-8 cursor-pointer' id='purchases'>
                    <IoTicketOutline size={30} className="gray-icon" />
                    <h3 className='text-[#717171] w-full text-lg selection:bg-[#ea1d2c] selection:text-white'>Meus Pedidos</h3>
                  </Link>
                  <Link href={"/cupons"} className='flex w-full justify-between items-center gap-8 cursor-pointer' id='coupons'>
                    <BsTicketPerforated size={30} className="gray-icon" />
                    <h3 className='text-[#717171] w-full text-lg selection:bg-[#ea1d2c] selection:text-white'>Meus Cupons</h3>
                  </Link>
                  {data.partner === true ? (
                    <Link href="/restaurant" className='flex w-full justify-between items-center gap-8 cursor-pointer'>
                      <IoStorefrontOutline size={30} className="gray-icon" />
                      <h3 className='text-[#717171] w-full text-lg selection:bg-[#ea1d2c] selection:text-white'>Meu Restaurante</h3>
                    </Link>
                  ) : (
                    <Link href="/restaurant/create" className='flex w-full justify-between items-center gap-8 cursor-pointer'>
                      <IoStorefrontOutline size={30} className="gray-icon" />
                      <h3 className='text-[#717171] w-full text-lg selection:bg-[#ea1d2c] selection:text-white'>Adicionar meu Restaurante</h3>
                    </Link>
                  )}
                  <Link href={"/favoritos"} className='flex w-full justify-between items-center gap-8 cursor-pointer' id='favorites'>
                    <AiOutlineHeart size={30} className="gray-icon" />
                    <h3 className='text-[#717171] w-full text-lg selection:bg-[#ea1d2c] selection:text-white'>Favoritos</h3>
                  </Link>
                  <Link href={"/perfil"} className='flex w-full justify-between items-center gap-8 cursor-pointer' id='profile'>
                    <IoSettingsOutline size={30} className="gray-icon" />
                    <h3 className='text-[#717171] w-full text-lg selection:bg-[#ea1d2c] selection:text-white'>Meu Perfil</h3>
                  </Link>
                  <Link href={"/rotina"} className='flex w-full justify-between items-center gap-8 cursor-pointer' id='routine'>
                    <IoCalendarOutline size={30} className="gray-icon" />
                    <h3 className='text-[#717171] w-full text-lg selection:bg-[#ea1d2c] selection:text-white'>Rotina de Pedidos</h3>
                  </Link>
                  <div className='flex w-full justify-between items-center gap-8 cursor-pointer' onClick={() => signOut()}>
                    <VscSignOut size={30} className="gray-icon" />
                    <h3 className='text-[#717171] w-full text-lg'>Sair</h3>
                  </div>
                </div>
              </div>
            ) : (<></>)}
          </div>
        </div>
      ) : (
        <div className='w-full flex justify-between sm:justify-normal gap-10 ml-10'>
          <div className='border border-gray-400 pt-2 pb-2 pl-6 pr-6 sm:w-[125px] w-full text-center rounded-xl cursor-pointer flex items-center justify-center text-gray-500 sm:text-base text-sm' onClick={() => signIn()}>Criar Conta</div>
          <div className='bg-[#ee4c58] text-white pt-2 pb-2 pl-6 pr-6 sm:w-[125px] w-full text-center rounded-xl cursor-pointer flex items-center justify-center sm:text-base text-sm' onClick={() => signIn()}>Entrar</div>
        </div>
      )}
    </div >
  )
}

export default Navbar
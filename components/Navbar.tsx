"use client"

import Link from 'next/link'
import React, { useState } from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'
import { IoBagOutline, IoMenuOutline, IoTicketOutline, IoSettingsOutline, IoHelpBuoyOutline, IoStorefrontOutline } from 'react-icons/io5'
import { AiOutlineHeart } from 'react-icons/ai'
import { BsTicketPerforated } from 'react-icons/bs'
import { VscSignOut } from 'react-icons/vsc'
import { infoUser } from '@/common/utils/userContext'

const Navbar = () => {

  const { data: session, status } = useSession()

  const { data } = infoUser()

  const [showMenu, setShowMenu] = useState<Boolean>(false)

  return (
    <div className='p-2 justify-around items-center w-full flex'>
      <Link href="/" className='w-full flex justify-center'>
        <img src="/assets/logo.png" className='max-w-[100px]' alt="Logo Image" />
      </Link>
      <ul className='ml-14 list-none gap-14 w-full justify-center hidden lg:flex'>
        <Link href="/"><li className='duration-300 transition-all hover:text-[#ea1d2c]'>Início</li></Link>
        <Link href="/home"><li className='duration-300 transition-all hover:text-[#ea1d2c]'>Restaurantes</li></Link>
        <Link href="/home"><li className='duration-300 transition-all hover:text-[#ea1d2c]'>Mercados</li></Link>
        <Link href="/"><li className='duration-300 transition-all hover:text-[#ea1d2c]'>Cupons</li></Link>
        <Link href="/"><li className='duration-300 transition-all hover:text-[#ea1d2c]'>Informações</li></Link>
      </ul>

      {session?.user?.email ? (
        <div className='w-full flex items-center gap-4 ml-20'>
          <img src={session?.user?.image || ""} className='w-[40px] h-[40px] duration-200 transition-all hover:scale-110 cursor-pointer rounded-full' alt="Profile Image" />
          <div className='flex items-center justify-center gap-2 transition-all duration-300 rounded-full hover:bg-[#b1b4b415] pl-6 pr-6 w-[125px] cursor-pointer'>
            <IoBagOutline size={35} className="red-icon" />
            <div className='w-full'>
              <h5 className='text-[12px]'>R$ 0,00</h5>
              <p className='text-[11px] text-[#717171] mt-[-3.5px]'>0 itens</p>
            </div>
          </div>
          <div className='flex items-center' onClick={() => setShowMenu(!showMenu)}>
            <IoMenuOutline size={30} className="cursor-pointer" />
            {showMenu ? (
              <div className='z-20 fixed right-0 bg-[#fff] shadow-md h-[700px] w-[350px] border border-[#f7f7f7] translate-y-2 transition-all rounded-lg mt-[750px] lg:left-[64%]'>
                <div className='p-10'>
                  <h1 className='text-3xl font-bold text-center'>Olá, {session?.user?.name}</h1>
                </div>
                <div className='w-full flex gap-4 p-6 bg-[#f7f7f7] items-center'>
                  <img src="https://cdn-icons-png.flaticon.com/512/6075/6075725.png" className='w-[50px] h-[50px]' alt="Cellphone Image" />
                  <div>
                    <h4 className='text-sm font-bold'>Ative as notificações</h4>
                    <p className='text-sm text-[#717171]'>Acompanhe de perto o andamento dos seus pedidos, promoções e novidades</p>
                    <h2 className='mt-6 text-[#ea1d2c] font-bold text-sm'>Ativar</h2>
                  </div>
                </div>
                <div className='p-10 gap-8 w-full flex flex-col'>
                  <Link href={"/pedidos"} className='flex w-full justify-between items-center gap-8 cursor-pointer'>
                    <IoTicketOutline size={30} className="gray-icon" />
                    <h3 className='text-[#717171] w-full text-lg'>Meus Pedidos</h3>
                  </Link>
                  <Link href={"/cupons"} className='flex w-full justify-between items-center gap-8 cursor-pointer'>
                    <BsTicketPerforated size={30} className="gray-icon" />
                    <h3 className='text-[#717171] w-full text-lg'>Meus Cupons</h3>
                  </Link>
                  {data.partner === true ? (
                    <Link href="/restaurant" className='flex w-full justify-between items-center gap-8 cursor-pointer'>
                      <IoStorefrontOutline size={30} className="gray-icon" />
                      <h3 className='text-[#717171] w-full text-lg'>Meu Restaurante</h3>
                    </Link>
                  ) : (
                    <Link href="/restaurant/create" className='flex w-full justify-between items-center gap-8 cursor-pointer'>
                      <IoStorefrontOutline size={30} className="gray-icon" />
                      <h3 className='text-[#717171] w-full text-lg'>Adicionar meu Restaurante</h3>
                    </Link>
                  )}
                  <div className='flex w-full justify-between items-center gap-8 cursor-pointer'>
                    <AiOutlineHeart size={30} className="gray-icon" />
                    <h3 className='text-[#717171] w-full text-lg'>Favoritos</h3>
                  </div>
                  <div className='flex w-full justify-between items-center gap-8 cursor-pointer'>
                    <IoSettingsOutline size={30} className="gray-icon" />
                    <h3 className='text-[#717171] w-full text-lg'>Meus Dados</h3>
                  </div>
                  <div className='flex w-full justify-between items-center gap-8 cursor-pointer'>
                    <IoHelpBuoyOutline size={30} className="gray-icon" />
                    <h3 className='text-[#717171] w-full text-lg'>Ajuda</h3>
                  </div>
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
        <div className='w-full flex gap-10 ml-10'>
          <div className='border border-gray-400 pt-2 pb-2 pl-6 pr-6 w-[125px] text-center rounded-xl cursor-pointer flex items-center justify-center text-gray-500' onClick={() => signIn()}>Criar Conta</div>
          <div className='bg-[#ee4c58] text-white pt-2 pb-2 pl-6 pr-6 w-[125px] text-center rounded-xl cursor-pointer flex items-center justify-center' onClick={() => signIn()}>Entrar</div>
        </div>
      )}
    </div >
  )
}

export default Navbar
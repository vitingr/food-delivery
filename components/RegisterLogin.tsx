"use client"

import Link from 'next/link'
import React from 'react'
import { useSession, signIn } from 'next-auth/react'
import { IoBagOutline} from 'react-icons/io5'

const RegisterLogin = () => {

  const { data: session, status } = useSession()

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

export default RegisterLogin
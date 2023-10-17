import { footerLinks } from '@/constants/footer'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <footer className='mt-20'>
      <div className='border-zinc-100 border-t-2 min-h-[400px] flex w-full p-16 flex-col sm:flex-row'>
        <div className='w-full xs:mb-12 flex flex-col items-center xs:justify-center'>
          <img src="/assets/logo.png" className='max-w-[125px]' alt="Logo" />
          <p className='text-gray-700'>Plataforma de Delivery</p>
          <p className='text-gray-700'>Todos direitos reservados Vitor Gabriel Silva</p>
        </div>
        <div className='w-full flex gap-6 flex-wrap sm:flex-nowrap mt-16 sm:mt-0'>
          {footerLinks.map((link) => (
            <div key={link.title} className='w-full flex flex-col gap-6 text-base min-w-[170px] justify-center items-center sm:justify-normal sm:items-start'>
              <h3 className='font-bold'>{link.title}</h3>
              {link.links.map((item) => (
                <Link key={item.title} href={item.url} className="text-gray-500">
                  {item.title}
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>
    </footer>
  )
}

export default Footer
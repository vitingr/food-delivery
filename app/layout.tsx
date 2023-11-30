"use client"

import Navbar from '@/components/Navbar'
import './globals.css'
import type { Metadata } from 'next'
import Footer from '@/components/Footer'
import Provider from '@/components/Config/Provider'
import { usePathname } from 'next/navigation'
import { checkIsPublicRoute } from '@/common/check-route'
import { UserProvider } from '@/common/utils/userContext'
import PrivateRoute from '@/components/Config/PrivateRoute'
import Coupons from '@/components/Coupons'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const metadata: Metadata = {
    title: 'Food Delivery',
    description: 'Generated by create next app',
  }

  const path = usePathname()

  const isPublic = checkIsPublicRoute(path)

  return (
    <html lang="en">
      <body>
        <Provider>
          {isPublic && (
            <>
              <UserProvider>
                <Navbar />
                <main className='selection:bg-[#ea1d2c] selection:text-white'>
                  {children}
                </main>
                <Footer />
              </UserProvider>
            </>
          )}

          {!isPublic && (
            <UserProvider>
              <PrivateRoute>
                <Navbar />
                <Coupons />
                <main className='selection:bg-[#ea1d2c] selection:text-white'>
                  {children}
                </main>
                <Footer />
              </PrivateRoute>
            </UserProvider>
          )}
        </Provider>
      </body>
    </html>
  )
}

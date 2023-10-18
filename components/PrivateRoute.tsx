"use client"

import { APP_ROUTES } from '@/constants/app-routes'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  
  const router = useRouter()

  const {data: session, status} = useSession()

  const [isLogged, setIsLogged] = useState<boolean>(false)

  const checkUser = async () => {
    if (status !== "loading") {
      if (status === "unauthenticated") {
        router.push(APP_ROUTES.public.home)
      } 
      if (status === "authenticated") {
        setIsLogged(true)
      }
    }
  }

  useEffect(() => {
    if (status !== "loading") {
      checkUser()
    }
  }, [session])

  return isLogged ? (
    <>
      {children}
    </>
  ) : (
    <></>
  )
}

export default PrivateRoute
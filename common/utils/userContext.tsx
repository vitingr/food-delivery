"use client"

import { UserContextProps, UserProps } from '@/types/types'
import { useSession } from 'next-auth/react'
import React, { createContext, useContext, useEffect, useState } from 'react'

const UserContext = createContext<UserContextProps | any>(undefined)

export const UserProvider = ({ children } : { children: React.ReactNode }) => {

  const {data: session, status} = useSession()

  const [data, setData] = useState<UserProps | any>([])

  const getInfo = async () => {
    try {
      const requisition = await fetch(`https://food-delivery-nest-api.vercel.app/user/${session?.user?.email}`)
      const response = await requisition.json()
      
      if (response === null) {
        const fullname = session?.user?.name
        const firstname = fullname?.split(" ")[0]
        const lastname = fullname?.split(" ")[1]

        const createUser = await fetch('https://food-delivery-nest-api.vercel.app/user/create', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: session?.user?.name,
            firstname: firstname,
            lastname: lastname,
            email: session?.user?.email,
            partner: false,
            money: 0,
            photo: session?.user?.image
          })
        })

        if (createUser.ok) {
          getInfo()
        }

      } else {
        setData(response)
      }

    } catch (error) {
      console.log(error)
      throw new Error("ERRO! Não foi possível obter as informações do usuário")
    }
  }

  useEffect(() => {
    if (session?.user?.email !== undefined && status === "authenticated") {
      getInfo()
    }
  }, [session])

  return (
    <UserContext.Provider value={{data, setData, getInfo}}>
      {children}
    </UserContext.Provider>
  )
}

export const infoUser = () => useContext(UserContext)
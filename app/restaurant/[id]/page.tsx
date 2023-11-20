"use client"

import React from 'react'
import { usePathname } from 'next/navigation'
import RestaurantMain from '@/components/Restaurant'

const page = () => {

  const pathname = usePathname().split("/")
  const query = pathname[2]

  return (
    <RestaurantMain query={query} />
  )
}

export default page
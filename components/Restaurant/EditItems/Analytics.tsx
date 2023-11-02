"use client"
import DoughnutChart from '@/components/DoughnutChart'
import { AnalyticsProps, ProductProps } from '@/types/types'
import React, { useEffect, useState } from 'react'

const Analytics = ({ restaurantData, restaurantId }: AnalyticsProps) => {
  const [products, setProducts] = useState<ProductProps[] | any>([])
  const [chartSalesData, setChartSalesData] = useState<any>({
    datasets: []
  })

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Produtos mais vendidos',
    }
  };

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

  const getChartData = async () => {
    if (products.length > 0) {

      const productNames = products.map((product: ProductProps) => product.productName);
      const sales = products.map((product: ProductProps) => product.sales | 0);

      setChartSalesData({
        labels: productNames,
        datasets: [
          {
            label: "Produtos mais vendidos",
            data: sales,
            backgroundColor: [
              'rgb(255, 99, 132)',
              'rgb(54, 162, 235)',
              'rgb(255, 205, 86)',
              'rgb(75, 192, 192)',
            ],
            hoverOffset: 4
          }
        ]
      })
    }
  }

  useEffect(() => {
    getRestaurantProducts()
  }, [restaurantId]);

  useEffect(() => {
    if (products.length > 0) {
      getChartData();
    }
  }, [products]);

  return (
    <div className='w-full flex flex-col items-center mt-[50px]'>
      <div className='flex justify-center w-full gap-10 max-w-[1500px]'>
        <div className='w-full flex flex-col items-center'>
          <h2 className='text-xl mb-6'>Produtos mais vendidos</h2>
          <DoughnutChart chartData={chartSalesData} chartOptions={options} />
        </div>
        <div className='w-full flex flex-col items-center'>
          <h2 className='text-xl mb-6'>Produtos mais vendidos</h2>
          <DoughnutChart chartData={chartSalesData} chartOptions={options} />
        </div>
      </div>
    </div>
  )
}

export default Analytics
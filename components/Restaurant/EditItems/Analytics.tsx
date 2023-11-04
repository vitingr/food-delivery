"use client"
import DoughnutChart from '@/components/DoughnutChart'
import LineChart from '@/components/LineChart'
import { AnalyticsProps, ProductProps, PurchaseProps } from '@/types/types'
import React, { useEffect, useState } from 'react'

const Analytics = ({ restaurantData, restaurantId }: AnalyticsProps) => {
  const [products, setProducts] = useState<ProductProps[] | any>([])
  const [purchases, setPurchases] = useState<PurchaseProps[]>([])
  const [qtdProductsSold, setQtdProductsSold] = useState<number>(0)
  const [chartSalesData, setChartSalesData] = useState<any>({
    datasets: []
  })
  const [chartPeakPeriod, setChartPeakPeriod] = useState<any>({
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

  const getPurchases = async () => {
    try {
      const result = await fetch(`http://localhost:3001/purchase/restaurantPurchases/${restaurantId}`)
      const response = await result.json()

      setPurchases(response)

    } catch (error) {
      console.log(error)
      throw new Error("Não foi possível obter os pedidos do restaurante")
    }
  }

  const getChartData = async () => {
    if (products.length > 0) {

      const productNames = products.map((product: ProductProps) => product.productName);
      const sales = products.map((product: ProductProps) => product.sales | 0);

      let counter: number = 0
      purchases.map((purchase: PurchaseProps) => counter++);
      setQtdProductsSold(counter)

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

    setChartPeakPeriod({
      labels: ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"],
      datasets: [
        {
          label: "Produtos mais vendidos",
          data: [4, 3, 5, 5, 14, 12, 9],
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

  useEffect(() => {
    getRestaurantProducts()
    getPurchases()
  }, [restaurantId]);

  useEffect(() => {
    if (products.length > 0) {
      getChartData();
    }
  }, [products, purchases]);

  return (
    <div className='w-full flex flex-col items-center mt-[50px] pb-10'>
      <div className='flex justify-between w-full gap-10 max-w-[1500px] sm:flex-nowrap flex-wrap'>
        <div className='w-full flex flex-col items-center sm:shadow-md sm:p-12 sm:border sm:border-neutral-200 sm:rounded-xl'>
          <h2 className='text-2xl mb-6 font-semibold'>Produtos mais vendidos</h2>
          <DoughnutChart chartData={chartSalesData} chartOptions={options} />
        </div>
        <div className='w-full flex flex-col items-center sm:shadow-md sm:p-12 sm:border sm:border-neutral-200 sm:rounded-xl'>
          <h2 className='text-2xl mb-6 font-semibold'>Produtos mais vendidos</h2>
          <DoughnutChart chartData={chartSalesData} chartOptions={options} />
        </div>
      </div>

      <div className='w-full max-w-[1500px] flex justify-between gap-10 mt-[75px]'>
        <ul className='w-full flex flex-col gap-6 sm:shadow-md sm:p-12 sm:border sm:border-neutral-200 sm:rounded-xl'>
          <h2 className='text-2xl mb-6 font-semibold'>Informações Financeiras</h2>
          <li className='flex justify-between items-center gap-2 w-full border-b border-neutral-200 pb-3'>
            <h2 className='w-full'>Receita</h2>
            <span className='w-full flex justify-end font-semibold'>R$ 200,00</span>
          </li>
          <li className='flex justify-between items-center gap-2 w-full border-b border-neutral-200 pb-3'>
            <h2 className='w-full'>Produtos Vendidos</h2>
            <span className='w-full flex justify-end font-semibold'>{qtdProductsSold} itens</span>
          </li>
          <li className='flex justify-between items-center gap-2 w-full border-b border-neutral-200 pb-3'>
            <h2 className='w-full'>Dia mais movimentado</h2>
            <span className='w-full flex justify-end font-semibold'>Sexta-Feira</span>
          </li>
          <li className='flex justify-between items-center gap-2 w-full border-b border-neutral-200 pb-3'>
            <h2 className='w-full'>Dia menos movimentado</h2>
            <span className='w-full flex justify-end font-semibold'>Segunda-Feira</span>
          </li>
        </ul>
        <div className='w-full flex flex-col items-center sm:shadow-md sm:p-12 sm:border sm:border-neutral-200 sm:rounded-xl'>
          <h2 className='text-2xl mb-6 font-semibold'>Horários de Pico</h2>
          <LineChart chartData={chartPeakPeriod} chartOptions={options} />
        </div>
      </div>
    </div>
  )
}

export default Analytics
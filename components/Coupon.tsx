import React from 'react'

const Coupon = () => {
  return (
    <div className='sm:w-[400px] w-full bg-white rounded-lg shadow-md'>
      <div className='flex gap-6 items-center p-8'>
        <img src="https://cdn-icons-png.flaticon.com/512/1211/1211031.png" className='w-[60px] h-[60px]' alt="Coupon Icon" />
        <h1 className='text-xl font-semibold selection:bg-[#ea1d2c] selection:text-white'>R$ 10 em qualquer compra no aplicativo</h1>
      </div>
      <div className=' p-8'>
        <p className='text-[#717171] text-sm text-justify mt-[-15px] selection:bg-[#ea1d2c] selection:text-white'>
          Este cupom é valido para todos as lojas e os pedidos realizados no nosso aplicativo (valor mínimo do pedido de 20 reais)
        </p>
        <h3 className='mt-10 text-[#717171] font-semibold text-sm selection:bg-[#ea1d2c] selection:text-white'>
          Válido até 12/12
        </h3>
      </div>
      <div className='bg-[#f7f7f7] p-6 flex items-center justify-center text-[#717171] selection:bg-[#ea1d2c] selection:text-white'>
        O cupom será aplicado no pagamento
      </div>
    </div>
  )
}

export default Coupon
"use client"
import { cellphoneMask } from '@/common/functions/cellphone-mask'
import { cpfMask } from '@/common/functions/cpf-mask'
import { isValidCPF } from '@/common/functions/cpf-validator'
import ToastMessage from '@/components/Config/ToastMessage'
import Upload from '@/components/Config/Upload'
import { CIDADES_BRASIL } from '@/constants/json-cidades'
import { MainConfig } from '@/types/types'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

const MainConfig = ({ restaurantData, restaurantId, getRestaurantData }: MainConfig) => {

  const router = useRouter()

  // Information about the restaurant owner
  const [cellphone, setCellphone] = useState<string>(restaurantData.cellphone)
  const [name, setName] = useState<string>(restaurantData.ownerName)
  const [lastName, setLastName] = useState<string>(restaurantData.ownerLastname)

  // Information about the restaurant
  const [restaurantName, setRestaurantName] = useState<string>(restaurantData.restaurantName)
  const [telephone, setTelephone] = useState<string>(restaurantData.telephone)
  const [street, setStreet] = useState<string>(restaurantData.street)
  const [city, setCity] = useState<string>(restaurantData.city)
  const [state, setState] = useState<string>(restaurantData.state)
  const [address, setAddress] = useState<string>(restaurantData.address)
  const [speciality, setSpeciality] = useState<string>(restaurantData.speciality)
  const [delivery, setDelivery] = useState<string>(restaurantData.delivery)
  const [deliveryValue, setDeliveryValue] = useState<number>(restaurantData.deliveryValue)
  const [deliveryTime, setDeliveryTime] = useState<string>(restaurantData.deliveryTime)
  const [logo, setLogo] = useState<string>(restaurantData.logo)
  const [background, setBackground] = useState<string>(restaurantData.background)
  const [minValue, setMinValue] = useState<number>(restaurantData.minValue)
  const [openingHour, setOpeningHour] = useState<number>(0)
  const [closingHour, setClosingingHour] = useState<number>(0)

  // Input Masks
  const [cpfFormated, setCpfFormated] = useState<string>("")
  let deliveryValueFormated = deliveryValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

  const [cidadesList, setCidadesList] = useState<any>([])

  const buscaCidadesPorEstado = (estado: string) => {
    var estadoSelecionado: any = CIDADES_BRASIL.estados.find((sigla) => sigla.sigla === estado); // Vai procurar no json estados, um estado com o sigla igual ao estado Selecionado
    var cidades = estadoSelecionado.cidades
    return cidades;
  }

  const handleChangeEstado = (e: any) => {
    const estado = e.target.value;
    setState(estado); // Vai retonar SP por exemplo
    const cidadesDoEstado = buscaCidadesPorEstado(estado); // Vai buscar as cidades que pertencem aquela sigla
    setCidadesList(cidadesDoEstado);
  }

  const verifyCellphone = async (value: string) => {
    const formatedCellphone: string = await cellphoneMask(value)
    setCellphone(formatedCellphone)
  }

  const verifyCellphoneRestaurant = async (value: string) => {
    const formatedCellphone: string = await cellphoneMask(value)
    setTelephone(formatedCellphone)
  }

  const updateInfo = async () => {
    if (restaurantId) {
      try {
        const response = await fetch("http://localhost:3001/restaurant/update", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: restaurantData.id,
            ownerId: restaurantData.ownerId,
            cellphone: cellphone,
            ownerName: name,
            ownerLastname: lastName,
            restaurantName: restaurantName,
            telephone: telephone,
            street: street,
            city: city,
            state: state,
            address: address,
            speciality: speciality,
            delivery: delivery,
            logo: logo,
            background: background,
            deliveryTime: deliveryTime,
            deliveryValue: deliveryValue,
            minValue: minValue
          })
        })

        if (response.ok) {
          getRestaurantData()
          router.push("/restaurant")
          toast.success("Informações do restaurante atualizadas!")
        } else {
          toast.error("Não foi possível atualizar as informações")
        }

      } catch (error) {
        console.log(error)
        toast.error("Não foi possível atualizar as informações")
      }
    }
  }

  const changeOpeningHour = (e: any) => {
    const hour = parseInt(e, 10);
    if (!isNaN(hour) && hour > 0 && hour <= 24) {
      setOpeningHour(hour);
    }
  }

  const changeClosingHour = (e: any) => {
    const hour = parseInt(e, 10);
    if (!isNaN(hour) && hour > 0 && hour <= 24) {
      setClosingingHour(hour);
    }
  }

  return (
    <div className='flex w-full justify-center'>
      <ToastMessage />
      <form className='max-w-[750px] w-full mt-16' onSubmit={(e: React.SyntheticEvent) => {
        e.preventDefault()
        updateInfo()
      }}>

        <label htmlFor="deliveryValue" className='text-lg'>Valor de entrega do Restaurante</label>
        <input type="number" name="deliveryValue" id="deliveryValue" max={200} min={1} className='w-full outline-none pl-4 pr-4 pt-2 pb-2 border border-neutral-200 rounded-lg mt-1 text-[#717171] mb-8' defaultValue={deliveryValue} autoComplete='off' placeholder='Qual é o valor de entrega do restaurante?' onChange={(e) => setDeliveryValue(Number(e.target.value))} pattern="^\d*(\.\d{0,2})?$" step="0.01" required />

        <label htmlFor="minValue" className='text-lg'>Valor mínimo do pedido</label>
        <input type="number" name="minValue" id="minValue" max={200} className='w-full outline-none pl-4 pr-4 pt-2 pb-2 border border-neutral-200 rounded-lg mt-1 text-[#717171] mb-8' defaultValue={minValue} autoComplete='off' placeholder='Qual é o tempo médio de entrega do restaurante' onChange={(e) => setMinValue(Number(e.target.value))} required />

        <label htmlFor="deliveryTime" className='text-lg'>Tempo médio de entrega</label>
        <input type="text" name="deliveryTime" id="deliveryTime" maxLength={15} minLength={2} className='w-full outline-none pl-4 pr-4 pt-2 pb-2 border border-neutral-200 rounded-lg mt-1 text-[#717171] mb-8' defaultValue={deliveryTime} autoComplete='off' placeholder='Qual é o tempo médio de entrega do restaurante' onChange={(e) => setDeliveryTime(e.target.value)} required />

        <div className='flex flex-col mt-10 mb-10 max-w-[500px]'>
          <label htmlFor="logo" className='text-lg'>Sua Logo</label>
          <Upload currentFoto={logo} setState={setLogo} styles='w-full absolute opacity-0 cursor-pointer max-w-[375px] mt-[10px]' text='Enviar logo' />

          <label htmlFor="background" className='text-lg mt-10'>Seu Plano de Fundo</label>
          <Upload currentFoto={background} setState={setBackground} styles='w-full absolute opacity-0 cursor-pointer max-w-[375px] mt-[10px]' text='Enviar background' />
        </div>

        <label htmlFor="telefone" className='text-lg'>Celular do Dono (com DDD)</label>
        <input type="text" name="telefone" id="telefone" maxLength={15} minLength={11} className='w-full outline-none pl-4 pr-4 pt-2 pb-2 border border-neutral-200 rounded-lg mt-1 text-[#717171] mb-8' defaultValue={cellphone} autoComplete='off' placeholder='Qual é o celular do restaurante' onChange={(e) => verifyCellphone(e.target.value)} required />

        <div className='flex items-center gap-6'>
          <div className='w-full'>
            <label htmlFor="abertura" className='text-lg'>Hora de Abertura do Restaurante</label>
            <input type="number" name="abertura" id="abertura" max={24} min={0} value={openingHour} className='w-full outline-none pl-4 pr-4 pt-2 pb-2 border border-neutral-200 rounded-lg mt-1 text-[#717171] mb-8' autoComplete='off' placeholder='Hora da abertura do restaurante' onChange={(e) => changeOpeningHour(e.target.value)} required />
          </div>
          <div className='w-full'>
            <label htmlFor="fechamento" className='text-lg'>Hora de Fechamento do Restaurante</label>
            <input type="number" name="fechamento" id="fechamento" max={24} min={0} value={closingHour} className='w-full outline-none pl-4 pr-4 pt-2 pb-2 border border-neutral-200 rounded-lg mt-1 text-[#717171] mb-8' autoComplete='off' placeholder='Hora do fechamento do restaurante' onChange={(e) => changeClosingHour(e.target.value)} required />
          </div>
        </div>

        <div className='flex items-center gap-6'>
          <div className='w-full'>
            <label htmlFor="nome" className='text-lg'>Nome</label>
            <input type="text" name="nome" id="nome" minLength={2} maxLength={55} defaultValue={name} className='w-full outline-none pl-4 pr-4 pt-2 pb-2 border border-neutral-200 rounded-lg mt-1 text-[#717171] mb-8' autoComplete='off' placeholder='Nome do dono' onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className='w-full'>
            <label htmlFor="sobrenome" className='text-lg'>Sobrenome</label>
            <input type="text" name="sobrenome" id="sobrenome" minLength={2} maxLength={55} defaultValue={lastName} className='w-full outline-none pl-4 pr-4 pt-2 pb-2 border border-neutral-200 rounded-lg mt-1 text-[#717171] mb-8' autoComplete='off' placeholder='Sobrenome do dono' onChange={(e) => setLastName(e.target.value)} required />
          </div>
        </div>

        <label htmlFor="restauranteName" className='text-lg'>Nome do restaurante</label>
        <input type="text" name="restauranteName" id="restauranteName" minLength={2} maxLength={40} defaultValue={restaurantName} className='w-full outline-none pl-4 pr-4 pt-2 pb-2 border border-neutral-200 rounded-lg mt-1 text-[#717171] mb-8' autoComplete='off' placeholder='Nome do restaurante' onChange={(e) => setRestaurantName(e.target.value)} required />

        <label htmlFor="telephone" className='text-lg'>Celular do Restaurante (com DDD)</label>
        <input type="text" name="telephone" id="telephone" maxLength={15} className='w-full outline-none pl-4 pr-4 pt-2 pb-2 border border-neutral-200 rounded-lg mt-1 text-[#717171] mb-8' autoComplete='off' defaultValue={telephone} placeholder='Qual é o telefone do restaurante?' onChange={(e) => verifyCellphoneRestaurant(e.target.value)} required />

        <div className='flex items-center gap-6'>
          <div className='w-full'>
            <label htmlFor="state" className='text-lg'>Estado</label>
            <select name="state" id="state" className='w-full outline-none pl-4 pr-4 pt-2 pb-2 border border-neutral-200 rounded-lg mt-1 text-[#717171] mb-8' defaultValue={state} onChange={handleChangeEstado} required>
              <option value="">Selecione um estado</option>
              {CIDADES_BRASIL.estados.map((estado: any) => (
                <option key={estado.sigla} value={estado.sigla}>
                  {estado.nome}
                </option>
              ))}
            </select>
          </div>
          <div className='w-full'>
            <label htmlFor="city" className='text-lg'>Cidade</label>
            <select name="city" id="city" className='w-full outline-none pl-4 pr-4 pt-2 pb-2 border border-neutral-200 rounded-lg mt-1 text-[#717171] mb-8' defaultValue={city} onChange={(e) => setCity(e.target.value)} required>
              <option value="">Selecione uma cidade</option>
              {cidadesList.map((cidade: any) => (
                <option key={cidade} value={cidade}>
                  {cidade}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className='flex items-center gap-6'>
          <div className='w-full'>
            <label htmlFor="street" className='text-lg'>Endereço</label>
            <input type="text" name="street" id="street" minLength={2} maxLength={55} className='w-full outline-none pl-4 pr-4 pt-2 pb-2 border border-neutral-200 rounded-lg mt-1 text-[#717171] mb-8' defaultValue={street} autoComplete='off' placeholder='Exemplo: Bairro ou Rua do restaurante' onChange={(e) => setStreet(e.target.value)} required />
          </div>
          <div>
            <label htmlFor="address" className='text-lg'>Número</label>
            <input type="number" name="address" id="address" min={1} max={99999} className='w-full outline-none pl-4 pr-4 pt-2 pb-2 border border-neutral-200 rounded-lg mt-1 text-[#717171] mb-8' defaultValue={address} autoComplete='off' placeholder='Número do endereço' onChange={(e) => setAddress(e.target.value)} required />
          </div>
        </div>

        <label htmlFor="speciality" className='text-lg'>Especialidade</label>
        <select name="speciality" id="speciality" className='w-full outline-none pl-4 pr-4 pt-2 pb-2 border border-neutral-200 rounded-lg mt-1 text-[#717171] mb-8' autoComplete='off' defaultValue={speciality} onChange={(e) => setSpeciality(e.target.value)} required>
          <option value="">Selecione a especialidade principal do restaurante</option>
          <option value="Açaí">Açaí</option>
          <option value="Alemã">Alemã</option>
          <option value="Árabe">Árabe</option>
          <option value="Argentina">Argentina</option>
          <option value="Bebidas">Bebidas</option>
          <option value="Brasileira">Brasileira</option>
          <option value="Cafeteria">Cafeteria</option>
          <option value="Carnes">Carnes</option>
          <option value="Sucos">Sucos</option>
          <option value="Chinesa">Chinesa</option>
          <option value="Coreana">Coreana</option>
          <option value="Doces e Bolos">Doces e Bolos</option>
          <option value="Francesa">Francesa</option>
          <option value="Frutos do mar">Frutos do mar</option>
          <option value="Gourmet">Gourmet</option>
          <option value="Italiana">Italiana</option>
          <option value="Japonesa">Japonesa</option>
          <option value="Lanches">Lanches</option>
          <option value="Marmita">Marmita</option>
          <option value="Mexicana">Mexicana</option>
          <option value="Mercado">Mercado</option>
          <option value="Padaria">Padaria</option>
          <option value="Peixes">Peixes</option>
          <option value="Saudável">Saudável</option>
        </select>

        <label htmlFor="delivery" className='text-lg'>O restaurante possui serviço de entrega?</label>
        <div className="flex items-center gap-12 mt-4">
          <div className='flex gap-4 items-center'>
            {delivery === "Sim" ? (
              <>
                <div className='flex gap-4 items-center'>
                  <input type="radio" name="delivery" id="delivery" value={"Sim"} className='accent-[#ea1d2c] text-white w-[15px] h-[15px] cursor-pointer' onChange={(e) => setDelivery(e.target.value)} checked />
                  <h2>Sim</h2>
                </div>
                <div className='flex gap-4 items-center'>
                  <input type="radio" name="delivery" id="delivery" value={"Não"} className='accent-[#ea1d2c] text-white w-[15px] h-[15px] cursor-pointer' onChange={(e) => setDelivery(e.target.value)} />
                  <h2>Não</h2>
                </div>
              </>
            ) : (
              <>
                <div className='flex gap-4 items-center'>
                  <input type="radio" name="delivery" id="delivery" value={"Sim"} className='accent-[#ea1d2c] text-white w-[15px] h-[15px] cursor-pointer' onChange={(e) => setDelivery(e.target.value)} />
                  <h2>Sim</h2>
                </div>
                <div className='flex gap-4 items-center'>
                  <input type="radio" name="delivery" id="delivery" value={"Não"} className='accent-[#ea1d2c] text-white w-[15px] h-[15px] cursor-pointer' onChange={(e) => setDelivery(e.target.value)} checked />
                  <h2>Não</h2>
                </div>
              </>
            )}
          </div>
        </div>

        <button type='submit' className='mt-12 w-full bg-[#ea1d2c] rounded-xl p-4 text-center text-white font-bold cursor-pointer'>Confirmar Alterações</button>

      </form>
    </div>
  )
}

export default MainConfig
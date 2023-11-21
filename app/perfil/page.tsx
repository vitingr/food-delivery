"use client"

import { infoUser } from '@/common/utils/userContext'
import Loader from '@/components/Config/Loader'
import ToastMessage from '@/components/Config/ToastMessage'
import Upload from '@/components/Config/Upload'
import Popup from '@/components/Popup/Popup'
import { CIDADES_BRASIL } from '@/constants/json-cidades'
import { AddressProps } from '@/types/types'
import { useSession } from 'next-auth/react'
import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'

const page = () => {

  const { data: session, status } = useSession()
  const { data } = infoUser()

  const isFetched = useRef(false)

  const [firstname, setFirstname] = useState<string>(data.firstname)
  const [lastname, setLastname] = useState<string>(data.lastname)
  const [photo, setPhoto] = useState<string>(data.photo)
  const [state, setState] = useState<string>("")
  const [city, setCity] = useState<string>("")
  const [street, setStreet] = useState<string>("")
  const [address, setAddress] = useState<string>("")
  const [addressId, setAddressId] = useState<string>(data.address)

  const [userAddresses, setUserAddresses] = useState<AddressProps[]>([])
  const [creatingAddress, setCreatingAddress] = useState<boolean>(false)

  const updateUser = async () => {
    if (data.id !== undefined) {
      try {
        let name = `${firstname} ${lastname}`

        const response = await fetch("https://food-delivery-nest-api.vercel.app/user/update", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: data.id,
            name: name,
            firstname: firstname,
            lastname: lastname,
            photo: photo,
            address: addressId
          })
        })

        if (response.ok) {
          toast.success("Informações atualizadas com sucesso!")
        } else {
          toast.error("Não foi possível editar as informações do usuário")
        }

      } catch (error) {
        toast.error("Não foi possível editar as informações do usuário")
      }
    }
  }

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

  const getUserAddress = async () => {
    if (data.id !== null && data.id !== undefined) {
      try {
        const result = await fetch(`https://food-delivery-nest-api.vercel.app/address/${data.id}`)
        const response = await result.json()
        setUserAddresses(response)
      } catch (error) {
        console.log(error)
        toast.error("ERRO! Não foi possível obter os endereços do usuário")
      }
    }
  }

  const createAddress = async (state: string, city: string, street: string, address: number) => {
    if (data.id !== null && data.id !== undefined && state !== "" && city !== "" && street !== "" && address !== 0) {
      try {
        const response = await fetch("https://food-delivery-nest-api.vercel.app/address/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user: data.id,
            state: state,
            city: city,
            street: street,
            address: Number(address)
          })
        })

        if (response.ok) {
          await getUserAddress()

          setCreatingAddress(false)

          toast.success("Endereço adicionado com sucesso!")
        } else {
          toast.error("ERRO! Não foi possível adicionar o endereço")
        }

      } catch (error) {
        console.log(error)
        toast.error("ERRO! Não foi possível adicionar o endereço")
      }
    }
  }

  useEffect(() => {
    if (!isFetched.current) {
      if (session?.user?.email !== undefined && status === "authenticated" && data.id !== null) {
        getUserAddress()
      }
    } else {
      isFetched.current = true
    }
  }, [data])

  return data.id !== undefined ? (
    <div className='p-[5%] w-full flex flex-col items-center'>
      <ToastMessage />
      <h1 className='selection:bg-[#ea1d2c] selection:text-white sm:text-2xl text-3xl font-semibold mb-20 mt-12 sm:mb-28 w-full max-w-[1500px] sm:text-left text-center'>Meus Perfil</h1>

      <form onSubmit={(e: React.SyntheticEvent) => {
        e.preventDefault()
        updateUser()
      }} className='max-w-[1500px]'>

        <div className='flex flex-col mt-10 mb-10 w-full'>
          <label htmlFor="logo" className='text-lg selection:bg-[#ea1d2c] selection:text-white'>Sua Foto</label>
          <Upload currentFoto={data.photo} setState={setPhoto} styles='w-full absolute opacity-0 cursor-pointer sm:max-w-[500px] max-w-[240px] mt-[10px] ' />
        </div>

        <div className='flex items-center gap-6'>
          <div className='w-full'>
            <label htmlFor="nome" className='text-lg selection:bg-[#ea1d2c] selection:text-white'>Nome</label>
            <input type="text" name="nome" id="nome" minLength={2} maxLength={55} className='w-full outline-none pl-4 pr-4 pt-2 pb-2 border border-neutral-200 rounded-lg mt-1 text-[#717171] mb-8' autoComplete='off' placeholder='Nome do dono' defaultValue={data.firstname} onChange={(e) => setFirstname(e.target.value)} required />
          </div>
          <div className='w-full'>
            <label htmlFor="sobrenome" className='text-lg selection:bg-[#ea1d2c] selection:text-white'>Sobrenome</label>
            <input type="text" name="sobrenome" id="sobrenome" minLength={2} maxLength={55} className='w-full outline-none pl-4 pr-4 pt-2 pb-2 border border-neutral-200 rounded-lg mt-1 text-[#717171] mb-8' autoComplete='off' placeholder='Sobrenome do dono' defaultValue={data.lastname} onChange={(e) => setLastname(e.target.value)} required />
          </div>
        </div>

        <div>
          <label htmlFor="deliveryPlace" className='text-lg selection:bg-[#ea1d2c] selection:text-white'>Seu endereço atual</label>
          <select name="deliveryPlace" id="deliveryPlace" className='w-full outline-none pl-4 pr-4 pt-2 pb-2 border border-neutral-200 rounded-lg mt-1 text-[#717171] mb-8' autoComplete='off' onChange={(e) => setAddressId(e.target.value)} required>
            <option value="">Escolha um endereço</option>
            {userAddresses.map((address: AddressProps) => (
              <option value={address.id} key={address.user}>{address.address}, {address.street}, {address.city} - {address.state}</option>
            ))}
          </select>
          <div className='text-[#ea1d2c] underline underline-offset-4 text-center w-full cursor-pointer mb-4' onClick={() => setCreatingAddress(true)}>
            Adicionar endereço
          </div>
        </div>

        {creatingAddress ? (
          <Popup state={setCreatingAddress} title={`Adicionar Endereço`}>
            <form onSubmit={(e: React.SyntheticEvent) => {
              e.preventDefault()
              createAddress(state, city, street, Number(address))
            }} className='mt-14 z-50 overflow-y-scroll max-h-[600px] pr-10 flex flex-col gap-4'>

              <div className='flex items-center gap-6'>
                <div className='w-full'>
                  <label htmlFor="state" className='text-lg'>Estado</label>
                  <select name="state" id="state" className='w-full outline-none pl-4 pr-4 pt-2 pb-2 border border-neutral-200 rounded-lg mt-1 text-[#717171] mb-8' onChange={handleChangeEstado} required>
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
                  <select name="city" id="city" className='w-full outline-none pl-4 pr-4 pt-2 pb-2 border border-neutral-200 rounded-lg mt-1 text-[#717171] mb-8' onChange={(e) => setCity(e.target.value)} required>
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
                  <input type="text" name="street" id="street" minLength={2} maxLength={55} className='w-full outline-none pl-4 pr-4 pt-2 pb-2 border border-neutral-200 rounded-lg mt-1 text-[#717171] mb-8' autoComplete='off' placeholder='Exemplo: Bairro ou Rua do restaurante' onChange={(e) => setStreet(e.target.value)} required />
                </div>
                <div>
                  <label htmlFor="address" className='text-lg'>Número</label>
                  <input type="number" name="address" id="address" min={1} max={99999} className='w-full outline-none pl-4 pr-4 pt-2 pb-2 border border-neutral-200 rounded-lg mt-1 text-[#717171] mb-8' autoComplete='off' placeholder='Número do endereço' onChange={(e) => setAddress(e.target.value)} required />
                </div>
              </div>

              <button className='mt-6 w-full bg-[#ea1d2c] rounded-xl p-4 text-center text-white font-bold cursor-pointer' type='submit'>
                Adicionar Endereço
              </button>
            </form>
          </Popup>
        ) : (<></>)}

        {firstname !== "" && lastname !== "" && photo !== "" && addressId != "" ? (
          <button className='mt-28 w-full border text-[#ea1d2c] border-[#ea1d2c] rounded-xl p-4 text-center font-bold cursor-pointer' type='submit'>
            Editar Informações
          </button>
        ) : (
          <button className='mt-28 w-full bg-[#dddddd] rounded-xl p-4 text-center text-[#717171] font-bold cursor-not-allowed' type='submit'>
            Editar Informações
          </button>
        )}

      </form>
    </div>
  ) : (
    <Loader />
  )
}

export default page
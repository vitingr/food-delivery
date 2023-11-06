"use client"

import React, { useState } from 'react'
import { CIDADES_BRASIL } from '@/constants/json-cidades'
import { toast } from 'react-toastify'
import ToastMessage from '@/components/Config/ToastMessage'
import { useRouter } from 'next/navigation'
import { infoUser } from '@/common/utils/userContext'
import { isValidCPF } from '@/common/functions/cpf-validator'
import { cellphoneMask } from '@/common/functions/cellphone-mask'
import { cpfMask } from '@/common/functions/cpf-mask'
import { CNPJMask } from '@/common/functions/cnpj-mask'

const page = () => {
  const [step, setStep] = useState(1)
  const { data, getInfo } = infoUser()
  const router = useRouter()

  // Information about the restaurant owner
  const [email, setEmail] = useState<string>("")
  const [cellphone, setCellphone] = useState<string>("")
  const [name, setName] = useState<string>("")
  const [lastName, setLastName] = useState<string>("")
  const [cpf, setCpf] = useState<string>("")
  const [rg, setRg] = useState<string>("")
  const [orgaoEmissor, setOrgaoEmissor] = useState<string>("")

  // Information about the restaurant
  const [cnpj, setCnpj] = useState<string>("")
  const [restaurantName, setRestaurantName] = useState<string>("")
  const [telephone, setTelephone] = useState<string>("")
  const [street, setStreet] = useState<string>("")
  const [city, setCity] = useState<string>("")
  const [state, setState] = useState<string>("")
  const [address, setAddress] = useState<string>("")
  const [speciality, setSpeciality] = useState<string>("")
  const [delivery, setDelivery] = useState<string>("")

  // Input Masks
  const [cpfFormated, setCpfFormated] = useState<string>("")

  const nextStep = async () => {
    let currentStep = step
    setStep(currentStep + 1)
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

  const verifyCPF = async (cpf: string) => {
    const valid: boolean | any = await isValidCPF(cpf)

    const formatedCPF: string = await cpfMask(cpf)
    setCpfFormated(formatedCPF)

    if (valid) {
      setCpf(formatedCPF)
    } else {
      if (!valid) {
        toast.error("CPF Inválido")
      }
    }
  }

  const verifyCellphone = async (value: string) => {
    const formatedCellphone: string = await cellphoneMask(value)
    setCellphone(formatedCellphone)
  }

  const verifyCellphoneRestaurant = async (value: string) => {
    const formatedCellphone: string = await cellphoneMask(value)
    setTelephone(formatedCellphone)
  }

  const verifyCNPJ = async (value: string) => {
    const formatedCPNJ: string = await CNPJMask(value)
    setCnpj(formatedCPNJ)
  }

  const createRestaurant = async () => {
    if (email != "" && cellphone !== "" && name !== "" && lastName !== "" && cpf !== "" && rg !== "" && orgaoEmissor !== "" && cnpj !== "" && restaurantName !== "" && telephone !== "" && state !== "" && city !== "" && address !== "" && street !== "" && speciality !== "" && delivery !== "" && data.email !== "" && data.email !== undefined) {
      try {

        const response = await fetch("http://localhost:3001/restaurant/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ownerId: data.id,
            email: email,
            cellphone: cellphone,
            ownerName: name,
            ownerLastname: lastName,
            cpf: cpf,
            rg: rg,
            orgaoEmissor: orgaoEmissor,
            cnpj: cnpj,
            restaurantName: restaurantName,
            telephone: telephone,
            street: street,
            city: city,
            state: state,
            address: Number(address),
            speciality: speciality,
            delivery: delivery,
            creatorEmail: data.email
          })
        })

        if (response.ok) {
          toast.success("Restaurante criado com sucesso!")
          await getInfo()
          router.push("/home")
        }

      } catch (error) {
        console.log(error)
        throw new Error("Algum campo é inválido ou está em branco!")
      }
    }
  }

  return (
    <div className='w-full flex flex-col p-[5%] items-center'>
      <ToastMessage />
      <div className='max-w-[550px] w-full'>
        <h1 className='w-full text-[#ea1d2c] text-xl tracking-wider mb-20 text-center underline-offset-8 underline cursor-pointer'>Etapa {step} de 2</h1>

        <form onSubmit={(e: React.SyntheticEvent) => {
          e.preventDefault()
          createRestaurant()
        }}>
          {step === 1 ? (
            <>
              <h2 className='text-2xl font-bold mb-10'>Sobre o dono do restaurante</h2>
              <label htmlFor="email" className='text-lg'>E-mail</label>
              <input type="email" name="email" id="email" minLength={2} maxLength={80} className='w-full outline-none pl-4 pr-4 pt-2 pb-2 border border-neutral-200 rounded-lg mt-1 text-[#717171] mb-8' autoComplete='off' placeholder='Qual o e-mail do dono do restaurante' onChange={(e) => setEmail(e.target.value)} required />

              <label htmlFor="telefone" className='text-lg'>Celular do Dono (com DDD)</label>
              <input type="text" name="telefone" id="telefone" maxLength={15} minLength={11} className='w-full outline-none pl-4 pr-4 pt-2 pb-2 border border-neutral-200 rounded-lg mt-1 text-[#717171] mb-8' value={cellphone} autoComplete='off' placeholder='Qual é o celular do restaurante' onChange={(e) => verifyCellphone(e.target.value)} required />

              <div className='flex items-center gap-6'>
                <div className='w-full'>
                  <label htmlFor="nome" className='text-lg'>Nome</label>
                  <input type="text" name="nome" id="nome" minLength={2} maxLength={55} className='w-full outline-none pl-4 pr-4 pt-2 pb-2 border border-neutral-200 rounded-lg mt-1 text-[#717171] mb-8' autoComplete='off' placeholder='Nome do dono' onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className='w-full'>
                  <label htmlFor="sobrenome" className='text-lg'>Sobrenome</label>
                  <input type="text" name="sobrenome" id="sobrenome" minLength={2} maxLength={55} className='w-full outline-none pl-4 pr-4 pt-2 pb-2 border border-neutral-200 rounded-lg mt-1 text-[#717171] mb-8' autoComplete='off' placeholder='Sobrenome do dono' onChange={(e) => setLastName(e.target.value)} required />
                </div>
              </div>

              <label htmlFor="cpf" className='text-lg'>CPF</label>
              <input type="text" name="cpf" id="cpf" minLength={11} maxLength={14} className='w-full outline-none pl-4 pr-4 pt-2 pb-2 border border-neutral-200 rounded-lg mt-1 text-[#717171] mb-8' autoComplete='off' value={cpfFormated} placeholder='Qual é o CPF do dono do restaurante?' onChange={(e) => verifyCPF(e.target.value)} required />

              <label htmlFor="rg" className='text-lg'>RG</label>
              <input type="text" name="rg" id="rg" minLength={8} maxLength={11} className='w-full outline-none pl-4 pr-4 pt-2 pb-2 border border-neutral-200 rounded-lg mt-1 text-[#717171] mb-8' autoComplete='off' value={rg.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5")} placeholder='Qual é o RG do dono do restaurante?' onChange={(e) => setRg(e.target.value)} required />

              <label htmlFor="orgao-emissor" className='text-lg'>Orgão Emissor</label>
              <select name="orgao-emissor" id="orgao-emissor" className='w-full outline-none pl-4 pr-4 pt-2 pb-2 border border-neutral-200 rounded-lg mt-1 text-[#717171] mb-8' autoComplete='off' onChange={(e) => setOrgaoEmissor(e.target.value)} required>
                <option value="">Selecione</option>
                <option value="SSP/UF">SSP/UF</option>
                <option value="Cartório Civil">Cartório Civil</option>
                <option value="Polícia Federal">Polícia Federal</option>
                <option value="Detran">Detran</option>
                <option value="ABNC">ABNC</option>
                <option value="CNIG">CNIG</option>
                <option value="CGPI">CGPI</option>
              </select>

              {email !== "" && cellphone !== "" && name !== "" && lastName !== "" && cpf !== "" && rg !== "" && orgaoEmissor !== "" ? <button onClick={(e: React.SyntheticEvent) => {
                e.preventDefault()
                nextStep()
              }} className='mt-12 w-full bg-[#ea1d2c] rounded-xl p-4 text-center text-white font-bold cursor-pointer'>Continuar</button> : <button className='mt-12 w-full bg-[#dddddd] rounded-xl p-4 text-center text-[#717171] font-bold cursor-not-allowed'>Continuar</button>}
            </>
          ) : (<></>)}
          {step === 2 ? (
            <>
              <h2 className='text-2xl font-bold mb-10'>Sobre o restaurante</h2>

              <label htmlFor="cnpj" className='text-lg'>CPNJ</label>
              <input type="text" name="cnpj" id="cnpj" minLength={14} maxLength={18} className='w-full outline-none pl-4 pr-4 pt-2 pb-2 border border-neutral-200 rounded-lg mt-1 text-[#717171] mb-8' autoComplete='off' placeholder='Qual é o CNPJ do restaurante?' onChange={(e) => verifyCNPJ(e.target.value)} value={cnpj} required />

              <label htmlFor="restauranteName" className='text-lg'>Nome do restaurante</label>
              <input type="text" name="restauranteName" id="restauranteName" minLength={2} maxLength={40} className='w-full outline-none pl-4 pr-4 pt-2 pb-2 border border-neutral-200 rounded-lg mt-1 text-[#717171] mb-8' autoComplete='off' placeholder='Nome do restaurante' onChange={(e) => setRestaurantName(e.target.value)} required />

              <label htmlFor="telephone" className='text-lg'>Celular do Restaurante (com DDD)</label>
              <input type="text" name="telephone" id="telephone" maxLength={15} className='w-full outline-none pl-4 pr-4 pt-2 pb-2 border border-neutral-200 rounded-lg mt-1 text-[#717171] mb-8' autoComplete='off' placeholder='Qual é o telefone do restaurante?' onChange={(e) => verifyCellphoneRestaurant(e.target.value)} value={telephone} required />

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

              <label htmlFor="speciality" className='text-lg'>Especialidade</label>
              <select name="speciality" id="speciality" className='w-full outline-none pl-4 pr-4 pt-2 pb-2 border border-neutral-200 rounded-lg mt-1 text-[#717171] mb-8' autoComplete='off' onChange={(e) => setSpeciality(e.target.value)} required>
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
                <option value="Padaria">Padaria</option>
                <option value="Peixes">Peixes</option>
              </select>

              <label htmlFor="delivery" className='text-lg'>O restaurante possui serviço de entrega?</label>
              <div className="flex items-center gap-12 mt-4">
                <div className='flex gap-4 items-center'>
                  <input type="radio" name="delivery" id="delivery" value={"Sim"} className='accent-[#ea1d2c] text-white w-[15px] h-[15px] cursor-pointer' onChange={(e) => setDelivery(e.target.value)} />
                  <h2>Sim</h2>
                </div>
                <div className='flex gap-4 items-center'>
                  <input type="radio" name="delivery" id="delivery" value={"Não"} className='accent-[#ea1d2c] text-white w-[15px] h-[15px] cursor-pointer' onChange={(e) => setDelivery(e.target.value)} />
                  <h2>Não</h2>
                </div>
              </div>

              {cnpj !== "" && restaurantName !== "" && telephone !== "" && state !== "" && city !== "" && address !== "" && street !== "" && speciality !== "" && delivery !== "" ? <button type='submit' className='mt-12 w-full bg-[#ea1d2c] rounded-xl p-4 text-center text-white font-bold cursor-pointer'>Cadastrar resturante</button> : <button className='mt-12 w-full bg-[#dddddd] rounded-xl p-4 text-center text-[#717171] font-bold cursor-not-allowed'>Cadastrar resturante</button>}
            </>
          ) : (<></>)}

        </form>

      </div>
    </div>
  )
}

export default page
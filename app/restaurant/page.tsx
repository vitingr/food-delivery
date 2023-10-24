"use client"

import { useSession } from 'next-auth/react'
import React, { useEffect, useState, useRef } from 'react'
import { IoAdd } from 'react-icons/io5'
import { RiVerifiedBadgeFill } from 'react-icons/ri'
import { AiFillStar } from 'react-icons/ai'
import { BsCoin } from 'react-icons/bs'
import { useRouter } from 'next/navigation'
import { APP_ROUTES } from '@/constants/app-routes'
import { toast } from 'react-toastify'
import ToastMessage from '@/components/Config/ToastMessage'
import Link from 'next/link'
import { AddressProps, CategoryProps, ProductProps, PurchaseProps, RestaurantData } from '@/types/types'
import { infoUser } from '@/common/utils/userContext'
import Popup from '@/components/Popup/Popup'
import { CIDADES_BRASIL } from '@/constants/json-cidades'

const page = () => {

  // Restaurant Config
  const { data: session, status } = useSession()
  const { data } = infoUser()

  const isFetched = useRef(false)

  const router = useRouter()

  // Restaurant Data
  const [restaurantData, setRestaurantData] = useState<RestaurantData | any>([])
  const [categories, setCategories] = useState<CategoryProps[]>([])
  const [products, setProducts] = useState<ProductProps[]>([])
  const [userAddresses, setUserAddresses] = useState<AddressProps[]>([])

  // Payment and Take Option
  const [deliveryPlace, setDeliveryPlace] = useState<string>("")
  const [takeMethod, setTakeMethod] = useState<string>("Retirada")
  const [paymentMethod, setPaymentMethod] = useState<string>("")
  const [commentaries, setCommentaries] = useState<string>("")

  // Purchase Information
  const [myPurchases, setMyPurchases] = useState<any>([])
  const [totalPurchaseValue, setTotalPurchaseValue] = useState<number>(0)

  // Popup Controllers
  const [buyingProducts, setBuyingProducts] = useState<boolean>(false)
  const [confirmingProducts, setConfirmingProducts] = useState<boolean>(false)
  const [payingProducts, setPayingProducts] = useState<boolean>(false)
  const [creatingAddress, setCreatingAddress] = useState<boolean>(false)

  // Create Address States
  const [street, setStreet] = useState<string>("")
  const [city, setCity] = useState<string>("")
  const [state, setState] = useState<string>("")
  const [address, setAddress] = useState<string>("")

  const [isOwner, setIsOwner] = useState<boolean>(false)

  const getRestaurantData = async () => {
    const requisition = await fetch(`http://localhost:3001/restaurant/${data.restaurantId}`)
    const response = await requisition.json()

    if (response !== null) {
      if (response.id === data.restaurantId) {
        setRestaurantData(response)
        setIsOwner(true)

        getRestaurantCategories(response.id)
      } else {
        toast.error("Você não pode editar um restaurante que não é seu")
        router.push(APP_ROUTES.private.usuario)
      }
    } else {
      toast.error("Você não pode editar um restaurante que não existe")
      router.push(APP_ROUTES.private.usuario)
    }
  }

  const getRestaurantCategories = async (restaurantId: string) => {
    try {
      const requisition = await fetch(`http://localhost:3001/category/${restaurantId}`)
      const response = await requisition.json()

      setCategories(response)

      getRestaurantProducts(restaurantId)

    } catch (error) {
      console.log(error)
      throw new Error("Não foi possível obter as categorias de produtos do restaurante")
    }
  }

  const getRestaurantProducts = async (restaurantId: string) => {
    try {
      const requisition = await fetch(`http://localhost:3001/product/${restaurantId}`)
      const response = await requisition.json()

      setProducts(response)

    } catch (error) {
      console.log(error)
      throw new Error("Não foi possível obter os produtos do restaurante")
    }
  }

  const chooseProduct = async (product: ProductProps) => {
    if (product) {
      try {
        let purchases = myPurchases
        purchases.push(product)
        setMyPurchases(purchases)

        let value = totalPurchaseValue
        value += product.productValue
        setTotalPurchaseValue(value)

        toast.success("Item Adicionado à sacola")

      } catch (error) {
        console.log("Não foi possível adicionar o item à sacola")
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
        const result = await fetch(`http://localhost:3001/address/${data.id}`)
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
        const response = await fetch("http://localhost:3001/address/create", {
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
          setPayingProducts(true)

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

  const confirmPurchase = async () => {
    if (totalPurchaseValue !== 0 && myPurchases.length > 0 && paymentMethod !== "" && takeMethod !== "" && data.id !== null && data.id !== undefined && restaurantData.id !== null && restaurantData.id !== undefined) {

      if (deliveryPlace === "") {
        setDeliveryPlace("retirada")
      }

      try {

        const ids: string[] = myPurchases.map((item: PurchaseProps) => item.id);

        const purchaseIds: string = ids.join(',');

        if (takeMethod === "Entrega") {
          let newPurchaseValue = totalPurchaseValue
          newPurchaseValue += restaurantData.deliveryValue
          setTotalPurchaseValue(newPurchaseValue)
        }

        const response = await fetch("http://localhost:3001/purchase/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user: data.id,
            restaurant: restaurantData.id,
            products: purchaseIds,
            quantity: Number(myPurchases.length),
            totalValue: Number(totalPurchaseValue),
            commentaries: commentaries,
            paymentMethod: paymentMethod,
            takeOption: takeMethod,
            deliveryAddress: deliveryPlace,
            deliveryTime: "30min - 35min",
            deliveryValue: Number(5),
            delivered: false,
          })
        })
        if (response.ok) {
          toast.success("Pedido realizado com sucesso!")
          setPayingProducts(false)
          setDeliveryPlace("")
          setTakeMethod("Retirada")
          setPaymentMethod("")
          setCommentaries("")
          setMyPurchases([])
          setTotalPurchaseValue(0)
        } else {
          toast.error("ERRO! Não foi possível finalizar o pedido")
        }

      } catch (error) {
        console.log(error)
        toast.error("ERRO! Não foi possível finalizar o pedido")
      }
    }
  }

  useEffect(() => {
    if (!isFetched.current) {
      if (session?.user?.email !== undefined && status === "authenticated" && data.id !== null) {
        getRestaurantData()
        getUserAddress()
      }
    } else {
      isFetched.current = true
    }
  }, [data])

  return isOwner === true ? (
    <div className='bg-[#f2f2f2] w-full min-h-[62vh] flex flex-col items-center p-[2%]'>
      <ToastMessage />
      <div className='bg-white max-w-[1300px] w-full rounded-sm p-16'>
        <div className='bg-[url("https://www.ifood.com.br/static/images/merchant/banner/DEFAULT.png")] bg-cover bg-no-repeat w-full h-[200px] rounded-xl' />
        <div className='mt-10 flex justify-between w-full'>
          <div className='flex gap-6 w-full'>
            <img src={restaurantData.logo} className='rounded-full w-[80px] h-[80px]' alt="Restaurant Image" />
            <div>
              <div className='flex items-center gap-2'>
                <h1 className='text-2xl'>{restaurantData.restaurantName}</h1>
                <RiVerifiedBadgeFill size={22.5} className="red-icon" />
              </div>
              <div>
                <h5 className='text-[#717171] text-sm'>Especialidade da casa: {restaurantData.speciality}</h5>
                <h6 className='text-[#717171] text-sm'>Tempo de entrega: ≅ {restaurantData.deliveryTime}</h6>
              </div>
            </div>
          </div>
          <div className=''>
            <div className='flex gap-8 h-[25px]'>
              <div className='flex gap-3 items-center'>
                <AiFillStar size={15} className="gold-icon" />
                <h3>{restaurantData.stars}.0</h3>
              </div>
              <div className='w-[200px] flex items-center gap-3 pl-8 border-l border-neutral-300'>
                <BsCoin size={15} className="gray-icon" />
                <p className='text-sm text-[#717171]'>Valor pedido mínimo {Number(restaurantData.minValue).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
              </div>
            </div>
            <div className='mt-8 flex gap-4'>
              <div className='w-full'>
                <h3 className='text-sm text-[#717171]'>Brasil - {restaurantData.state}, {restaurantData.city}</h3>
                <h5 className='text-base text-[#717171]'>{restaurantData.street}, {restaurantData.address}</h5>
              </div>
              <Link href="/restaurant/edit" className='bg-[#ea1d2c] text-white w-[150px] flex items-center justify-center rounded-lg cursor-pointer text-lg max-h-[45px]'>
                Editar
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className='bg-white w-full min-h-[18vh] p-16 mt-[75px] max-w-[1300px]'>
        <h1 className='w-full text-center text-4xl font-bold selection:bg-[#ea1d2c] selection:text-white mb-[50px]'>Menu do Restaurante</h1>
        {categories.length > 0 ? (
          <>
            {categories.map((category: CategoryProps) => (
              <div className='mt-[75px]' key={category.id}>
                <div>
                  <div className='flex items-end gap-2'>
                    <h2 className='font-bold text-2xl'>{category.categoryName}</h2>
                    {category.quantityItems === 0 ? <h5 className='text-sm'>Categoria vazia</h5> : <h5 className='text-sm'>{category.quantityItems} itens na categoria</h5>}
                  </div>
                  <h6 className='text-base text-[#717171] '>{category.categoryDescription}</h6>
                </div>
                <div className='mt-16 grid grid-cols-2 gap-8'>
                  {products.map((product: ProductProps) => (
                    <>
                      {product.category === category.id ? (
                        <div className='flex justify-between p-6 border border-neutral-100 rounded-lg h-[175px] w-full shadow-sm cursor-pointer transition-all duration-300 hover:border-neutral-300' key={product.id} onClick={() => setBuyingProducts(true)}>
                          <div className='flex flex-col justify-center w-full'>
                            <div className='h-full '>
                              <h1 className='text-2xl font-bold'>{product.productName}</h1>
                              <h2 className='text-[#717171] text-sm mt-2'>{product.productDescription}</h2>
                            </div>
                            <h5 className='text-xl'>{product.productValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h5>
                          </div>
                          <div>
                            <img src={product.productFoto} className='w-[125px] h-[125px]' alt="Product Image" />
                          </div>
                        </div>
                      ) : (<></>)}
                    </>
                  ))}
                </div>
              </div>
            ))}
          </>
        ) : (
          <p>Esse restaurante ainda não adicionou nada ao seu cardápio</p>
        )}

        {buyingProducts ? (
          <Popup state={setBuyingProducts} title={`Adicionar itens à Sacola`} handleSubmit={() => {
            setDeliveryPlace("")
            setTakeMethod("Retirada")
            setPaymentMethod("")
            setCommentaries("")
            setMyPurchases([])
            setTotalPurchaseValue(0)
          }}>
            <div className='mt-14 z-50 flex flex-col overflow-y-scroll max-h-[600px] pr-10'>
              {categories.map((category: CategoryProps) => (
                <div className='w-full pt-8 pb-4 border-t border-neutral-200' key={category.restaurant}>
                  <h2 className='font-bold mb-10 text-xl'>{category.categoryName}</h2>
                  <div>
                    {products.map((product: ProductProps) => (
                      <div key={product.productName}>
                        {product.category === category.id ? (
                          <div className='flex justify-between mb-5'>
                            <div className='w-full'>
                              <h1 className='text-lg font-semibold'>{product.productName}</h1>
                              <h2 className='text-[#717171]'>+ {product.productValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h2>
                            </div>
                            <img src={product.productFoto} alt="Product Photo" className='w-[65px] h-[65px]' />
                            <div className='ml-6 flex items-center cursor-pointer' onClick={() => chooseProduct(product)}>
                              <IoAdd size={25} className="red-icon" />
                            </div>
                          </div>
                        ) : (<></>)}
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              <div className='flex justify-between mt-10'>
                <h1 className='w-full'>Valor dos itens: {totalPurchaseValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h1>
                <h1 className='w-full flex justify-end text-[#717171]'>{myPurchases.length} itens</h1>
              </div>
              {myPurchases.length > 0 && totalPurchaseValue > restaurantData.minValue ? (
                <button className='mt-6 w-full bg-[#ea1d2c] rounded-xl p-4 text-center text-white font-bold cursor-pointer' type='submit' onClick={() => {
                  setBuyingProducts(!setBuyingProducts)
                  setConfirmingProducts(true)
                }}>
                  Avançar
                </button>
              ) : (
                <button className='mt-6 w-full bg-[#dddddd] rounded-xl p-4 text-center text-[#717171] font-bold cursor-not-allowed'>Avançar</button>
              )}
            </div>
          </Popup>
        ) : (<></>)}

        {confirmingProducts ? (
          <Popup state={setConfirmingProducts} title={`Confirmar Itens`} handleSubmit={() => {
            setDeliveryPlace("")
            setTakeMethod("Retirada")
            setPaymentMethod("")
            setCommentaries("")
            setMyPurchases([])
            setTotalPurchaseValue(0)
          }}>
            <form onSubmit={(e: React.SyntheticEvent) => {
              e.preventDefault()
            }} className='mt-14 z-50 overflow-y-scroll max-h-[600px] pr-10 flex flex-col gap-6'>
              {myPurchases.map((product: ProductProps) => (
                <div key={product.productDescription} className='flex flex-col gap-6'>
                  <div className='flex justify-between'>
                    <div className='max-w-[65px] max-h-[65px] flex justify-center'>
                      <img src={product.productFoto} alt="Product Photo" className='Product Image' />
                    </div>
                    <div className='w-full ml-4'>
                      <h1 className='text-lg font-semibold'>{product.productName}</h1>
                      <h2 className='text-[#717171]'>{product.productDescription}</h2>
                    </div>
                    <div className='ml-6 flex items-center'>
                      <p>{product.productValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                    </div>
                  </div>
                </div>
              ))}

              <div className='flex flex-col gap-4 w-full mt-10 pt-10 border-t border-neutral-200'>
                <label htmlFor="takeMethod" className='text-lg'>Como você prefere receber o item?</label>
                <select name="takeMethod" id="takeMethod" className='w-full outline-none pl-4 pr-4 pt-2 pb-2 border border-neutral-200 rounded-lg mt-1 text-[#717171] mb-8' autoComplete='off' onChange={(e) => setTakeMethod(e.target.value)} required>
                  <option value="">Escolha uma maneira</option>
                  <option value="Retirada">Retirada</option>
                  <option value="Entrega">Entrega</option>
                </select>

                <div className='flex justify-between w-full'>
                  <h1 className='w-full text-[#717171]'>Subtotal:</h1>
                  <h2 className='w-full flex justify-end'>{totalPurchaseValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h2>
                </div>
                <div className='flex justify-between w-full'>
                  <h1 className='w-full text-[#717171]'>Taxa de entrega:</h1>
                  {takeMethod == "Retirada" ? (
                    <h2 className='w-full flex justify-end text-green-700'>Grátis</h2>
                  ) : (
                    <h2 className='w-full flex justify-end'>{(restaurantData.deliveryValue).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h2>
                  )}
                </div>
                <div className='flex justify-between w-full'>
                  <h1 className='w-full text-[#717171]'>Cupom:</h1>
                  <h2 className='w-full flex justify-end'>- R$ 0,00</h2>
                </div>
                <div className='flex justify-between w-full mt-4'>
                  <h1 className='w-full text-[#717171] font-bold text-xl'>Total</h1>
                  {takeMethod == "Retirada" ? (
                    <h2 className='w-full flex justify-end font-bold text-xl'>{totalPurchaseValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h2>
                  ) : (
                    <h2 className='w-full flex justify-end font-bold text-xl'>{(totalPurchaseValue + 5).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h2>
                  )}
                </div>
              </div>
              <button className='mt-6 w-full bg-[#ea1d2c] rounded-xl p-4 text-center text-white font-bold cursor-pointer' type='submit' onClick={() => {
                setConfirmingProducts(!setBuyingProducts)
                setPayingProducts(true)
              }}>
                Fechar Pedido
              </button>
            </form>
          </Popup>
        ) : (<></>)}

        {payingProducts ? (
          <Popup state={setPayingProducts} title={`Retirada e Pagamento`} handleSubmit={() => {
            setDeliveryPlace("")
            setTakeMethod("Retirada")
            setPaymentMethod("")
            setCommentaries("")
            setMyPurchases([])
            setTotalPurchaseValue(0)
          }}>
            <form onSubmit={(e: React.SyntheticEvent) => {
              e.preventDefault()
              confirmPurchase()
            }} className='mt-14 z-50 overflow-y-scroll max-h-[600px] pr-10 flex flex-col gap-4'>

              {takeMethod === "Entrega" ? (
                <>
                  <div>
                    <label htmlFor="deliveryPlace" className='text-lg'>Em qual endereço devemos entregar?</label>
                    <select name="deliveryPlace" id="deliveryPlace" className='w-full outline-none pl-4 pr-4 pt-2 pb-2 border border-neutral-200 rounded-lg mt-1 text-[#717171] mb-8' autoComplete='off' onChange={(e) => setDeliveryPlace(e.target.value)} required>
                      <option value="">Escolha um endereço de entrega</option>
                      {userAddresses.map((address: AddressProps) => (
                        <option value={address.id} key={address.user}>{address.address}, {address.street}, {address.city} - {address.state}</option>
                      ))}
                    </select>

                    <div className='text-[#ea1d2c] underline underline-offset-4 text-center w-full cursor-pointer mb-4' onClick={() => {
                      setPayingProducts(false)
                      setCreatingAddress(true)
                    }}>
                      Adicionar endereço
                    </div>
                  </div>
                </>
              ) : (<></>)}

              <label htmlFor="paymentMethod" className='text-lg'>Como você deseja pagar?</label>
              <select name="paymentMethod" id="paymentMethod" className='w-full outline-none pl-4 pr-4 pt-2 pb-2 border border-neutral-200 rounded-lg mt-1 text-[#717171] mb-8' autoComplete='off' onChange={(e) => setPaymentMethod(e.target.value)} required>
                <option value="">Escolha o método de pagamento</option>
                <option value="Dinheiro">Dinheiro</option>
                <option value="Cartão de Crédito">Cartão de Crédito</option>
                <option value="Cartão de Débito">Cartão de Débito</option>
                <option value="Pix">Pix</option>
              </select>

              <label htmlFor="commentaries" className='text-lg'>Alguma observação?</label>
              <input type="text" name="commentaries" id="commentaries" minLength={2} maxLength={55} className='w-full outline-none pl-4 pr-4 pt-2 pb-2 border border-neutral-200 rounded-lg mt-1 text-[#717171] mb-8' autoComplete='off' placeholder='Comentários adicionais' onChange={(e) => setCommentaries(e.target.value)} />

              <button className='mt-6 w-full bg-[#ea1d2c] rounded-xl p-4 text-center text-white font-bold cursor-pointer' type='submit'>
                Fechar Pedido
              </button>
            </form>
          </Popup>
        ) : (<></>)}

        {creatingAddress ? (
          <Popup state={setCreatingAddress} title={`Adicionar Endereço`} handleSubmit={() => {
            setPayingProducts(true)
          }}>
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

      </div>
    </div >
  ) : (
    <></>
  )
}

export default page
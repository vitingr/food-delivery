import { UploadProps } from '@/types/types'
import React, { ChangeEvent } from 'react'

const Upload = ({ setState, currentFoto, styles }: UploadProps) => {
  const handleChangeImage = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()

    const file = e.target.files?.[0]

    if (!file) return

    if (!file.type.includes("image")) {
      alert("Só é possível enviar imagens")
      return
    }

    const reader = new FileReader()

    reader.readAsDataURL(file)
    reader.onload = () => {
      const result = reader.result as string
      setState(result)
    }
  }

  return (
    <div className='w-full pt-6 pb-6'>
      {!currentFoto ? (
        <label htmlFor="image">
          Envie uma Imagem do produto
          <div>
            <input type="file" name="image" id="image" accept='image/*' onChange={(e) => handleChangeImage(e)} className={` w-full absolute opacity-0 cursor-pointer p-3 mt-6 max-w-[300px]`} required />
            <h2 className='bg-[#ea1d2c] text-white p-3 w-full rounded-xl text-center mt-6'>Escolher Imagem</h2>
          </div>
        </label>
      ) : (
        <div className='flex w-full h-full'>
          <div>
            <img className='max-w-[150px] max-h-[150px]' src={currentFoto} alt="Image" />
          </div>
          <label htmlFor="image" className='w-full h-full ml-4 flex items-end'>
            <div className='w-full'>
              <input type="file" name="image" id="image" accept='image/*' onChange={(e) => handleChangeImage(e)} className={` w-full absolute opacity-0 cursor-pointer mt-[-80px] max-w-[300px]`} required />
              <h2 className='bg-[#ea1d2c] text-white p-3 w-full rounded-xl text-center cursor-pointer'>Editar Imagem</h2>
            </div>
          </label>
        </div>
      )}
    </div>
  )
}

export default Upload
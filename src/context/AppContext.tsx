import { showToast } from 'functions'
import { createContext, useState, useContext } from 'react'
import { supabase } from 'utils/supabaseClient'
import { v4 as uuid } from 'uuid'

interface IContextComponent {
  children: JSX.Element | JSX.Element[]
}

export enum EMode {
  TEXT = 'Texto',
  IMAGE = 'Imagen'
}

interface ICtxProps {
  mode: EMode
  changeMode: (mode: EMode) => void
  inputs: { id: number; value: string }[]
  setInputs: (inputs: { id: number; value: string }[]) => void
  deleteInput: (id: number) => void
  isSending: boolean
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  uploadBanner: (e: React.ChangeEvent<HTMLInputElement>) => void
  images: { file: File; url: string }[]
}

export const CtxApp = createContext({} as ICtxProps)

export default function AppContext(props: IContextComponent) {
  const initialState = [{ id: 1, value: '' }]

  const [mode, setMode] = useState(EMode.TEXT)
  const [isSending, setIsSending] = useState(false)
  const [inputs, setInputs] = useState(initialState)

  const [images, setImages] = useState<
    {
      file: File
      url: string
    }[]
  >([])

  function changeMode(mode: EMode) {
    setMode(mode)
  }

  function deleteInput(id: number) {
    const filteredInputs = inputs.filter(input => input.id !== id)
    setInputs(filteredInputs)
  }

  async function submitText() {
    if (inputs.length <= 1 && inputs[0].value.trim() === '') {
      showToast('warning', 'Ingresa al menos un mensaje')
      return
    }

    setIsSending(true)

    const dataToSend = inputs
      .map(input => {
        const hasUrl = /\S\.\S/g.test(input.value)

        return { message: input.value, hasUrl }
      })
      .filter(input => input.message.trim() !== '')

    const { data, error } = await supabase.from('messages').insert(dataToSend)

    if (error) {
      console.error(error)
      showToast('error', 'Hubo un error, intenta enviando los datos al número')
    }
    if (data) {
      setInputs(initialState)
      showToast('success', 'Mensajes enviados')
    }

    setIsSending(false)
  }

  async function uploadBanner(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files || e.target.files.length === 0) {
      // showToast('error', 'Ingresa una imagen')
      return
    }

    const files = Array.from(e.target.files)

    const newFiles = files.map(file => ({
      file,
      url: URL.createObjectURL(file)
    }))

    if (newFiles) setImages(newFiles)
  }

  async function submitImage() {
    const inputImage = document.querySelector('#input-image') as HTMLInputElement

    if (inputImage.value === '') {
      showToast('warning', 'Ingresa al menos una imagen')
      return
    }

    setIsSending(true)

    images.forEach(async image => {
      let imageName = `${Date.now()}_${uuid()}`
      const { data, error } = await supabase.storage
        .from('screenshots')
        .upload(imageName, image.file)

      if (error) {
        console.error(error)
        showToast('error', 'Hubo un error, intenta enviando los datos al número')
        setIsSending(false)
        return
      }
      if (data) {
        setInputs(initialState)
        showToast('success', 'Imagenes enviadas')
        inputImage.value = ''
        setImages([])
        setIsSending(false)
      }
    })
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    mode === EMode.TEXT ? submitText() : submitImage()
  }

  return (
    <CtxApp.Provider
      value={{
        mode,
        changeMode,
        inputs,
        setInputs,
        deleteInput,
        isSending,
        handleSubmit,
        uploadBanner,
        images
      }}
    >
      {props.children}
    </CtxApp.Provider>
  )
}

export const useApp = () => useContext(CtxApp)

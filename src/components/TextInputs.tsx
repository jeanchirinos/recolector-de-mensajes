import { useApp } from 'context/AppContext'
// import type { Dispatch, SetStateAction } from 'react'
import { SVGDelete, SVGPaste } from 'svgs'

export default function TextInputs() {
  const { inputs } = useApp()

  return (
    <div className='h-[200px] overflow-auto pr-1 sm:h-[300px]'>
      {inputs.map((input, i) => (
        <Input key={input.id} {...input} index={i + 1} />
      ))}
    </div>
  )
}

type IProps = {
  id: number
  index: number
  value: string
}

function Input({ id, value, index }: IProps) {
  const { inputs, setInputs, deleteInput } = useApp()

  async function pasteText() {
    // Safari: Works only in https
    const textToPaste = await navigator.clipboard.readText()

    addInputRow(textToPaste)
  }

  function addInputRow(textToAdd: string) {
    const withNewInputData = inputs.map(input => {
      if (input.id === id) input.value = textToAdd

      return input
    })

    setInputs(withNewInputData)

    if (textToAdd.trim() === '') return
    if (id !== inputs.at(-1)?.id) return

    const nextInputExist = inputs.find(input => input.id === id + 1)
    if (nextInputExist) return

    const auxInputs = [...inputs]
    auxInputs.push({ id: id + 1, value: '' })

    setInputs(auxInputs)

    const scrollableDiv = document.querySelector('.overflow-auto') as HTMLDivElement

    setTimeout(() => {
      scrollableDiv.scrollTo(0, scrollableDiv.scrollHeight)
    }, 100)
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const targetValue = e.currentTarget.value

    addInputRow(targetValue)
  }

  function handleBlur() {
    if (inputs.length <= 1 || id === inputs.at(-1)?.id) return
    setTimeout(() => {
      if (value.trim() !== '') return
      const filteredInputs = inputs.filter(input => input.id !== id)
      setInputs(filteredInputs)
    }, 100)
  }

  return (
    <div className='flex items-center'>
      <label htmlFor={String(id)} className='pointer-events-none px-2 text-xs font-light'>
        {index}
      </label>
      <input
        // autoFocus={index === 1}
        type='text'
        id={String(id)}
        value={value}
        placeholder='Agrega un mensaje SMS'
        className='w-0 flex-1 px-2 py-2 focus:outline-none'
        onChange={handleChange}
        onBlur={handleBlur}
        name='message'
      />

      {inputs.length > 1 && value !== '' && (
        <button
          onClick={() => deleteInput(id)}
          type='button'
          aria-label='borrar'
          className='flex cursor-pointer items-center justify-center gap-x-2 rounded bg-red-50 py-1 px-4 text-sm text-red-500  hover:bg-red-100'
        >
          <SVGDelete />
        </button>
      )}

      <button
        type='button'
        aria-label='pegar'
        title='Pegar'
        onClick={pasteText}
        className='flex cursor-pointer items-center justify-center gap-x-2 rounded border-l-2 border-t-2 border-gray-100 bg-gray-50   py-1 px-4 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900'
      >
        <SVGPaste />
      </button>
    </div>
  )
}

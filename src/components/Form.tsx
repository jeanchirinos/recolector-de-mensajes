import { EMode, useApp } from 'context/AppContext'
import { SVGImage, SVGText } from 'svgs'
import TextInputs from './TextInputs'
import Tab from './Tab'
import ImagesInputs from './ImagesInput'

export default function Form() {
  const { mode, isSending, handleSubmit } = useApp()

  return (
    <form onSubmit={handleSubmit} className='inline-flex max-w-full flex-col '>
      <article className='relative mb-6 flex w-[32rem] max-w-full flex-col overflow-hidden rounded-lg border border-gray-200'>
        <div className='flex border-b bg-gray-50'>
          <Tab mode={EMode.TEXT}>
            <SVGText />
          </Tab>
          <Tab mode={EMode.IMAGE}>
            <SVGImage />
          </Tab>
        </div>

        {mode === EMode.TEXT ? <TextInputs /> : <ImagesInputs />}
      </article>

      <button
        type='submit'
        disabled={isSending}
        className={`w-32 self-center rounded-lg bg-blue-700  py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-200 ${
          isSending && 'bg-purple-600 hover:bg-purple-800 focus:ring-purple-200'
        }`}
      >
        {isSending ? 'Enviando' : 'Enviar'}
      </button>
    </form>
  )
}

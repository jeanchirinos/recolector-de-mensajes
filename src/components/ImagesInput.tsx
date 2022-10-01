import { useApp } from 'context/AppContext'

export default function ImagesInputs() {
  const { uploadBanner, images } = useApp()

  return (
    <div
      onDragOver={e => e.currentTarget.classList.add('bg-gray-100')}
      onDragLeave={e => e.currentTarget.classList.remove('bg-gray-100')}
      onDrop={e => e.currentTarget.classList.remove('bg-gray-100')}
      className='relative h-[200px] overflow-y-auto transition-colors sm:h-[300px]'
    >
      <input
        type='file'
        multiple
        accept='image/jpeg, image/png, image/jpg'
        id='input-image'
        className='h-full w-full cursor-pointer bg-slate-600 opacity-0'
        required
        onChange={uploadBanner}
      />
      <label
        htmlFor='input-image'
        className={`pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-sm text-gray-500 ${
          images.length > 0 && 'hidden'
        }`}
      >
        Añade tus capturas
      </label>

      <div className='absolute top-0 left-0 -z-10 flex w-full flex-wrap gap-4 p-4'>
        {images?.map((image, i) => (
          <img
            className='aspect-[9/16] rounded-md object-cover object-center'
            key={i}
            src={image.url}
            alt=''
            width={72}
            height={128}
          />
        ))}
      </div>

      {/* {image.url ? (
        <Image
          id='image'
          src={image.url}
          alt='Previsualización del banner'
          layout='fill'
          objectFit='cover'
          objectPosition='center'
          priority
        />
      ) : (
        <p>Sube una imagen</p>
      )} */}
    </div>
  )
}

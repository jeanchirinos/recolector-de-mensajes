export function SVGText() {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='16'
      height='16'
      preserveAspectRatio='xMidYMid meet'
      viewBox='0 0 24 24'
    >
      <path fill='currentColor' d='M15 19H3v-2h12v2Zm6-4H3v-2h18v2Zm-6-4H3V9h12v2Zm6-4H3V5h18v2Z' />
    </svg>
  )
}

export function SVGImage() {
  return (
    <svg
      className='h-5 w-5'
      fill='currentColor'
      viewBox='0 0 20 20'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        fillRule='evenodd'
        d='M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z'
        clipRule='evenodd'
      ></path>
    </svg>
  )
}

export function SVGDelete() {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='16'
      height='16'
      preserveAspectRatio='xMidYMid meet'
      viewBox='0 0 16 16'
    >
      <path
        fill='currentColor'
        d='M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8L2.146 2.854Z'
      />
    </svg>
  )
}

export function SVGPaste() {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='16'
      height='16'
      preserveAspectRatio='xMidYMid meet'
      viewBox='0 0 32 32'
    >
      <path
        fill='currentColor'
        d='M26 20h-8.17l2.58-2.59L19 16l-5 5l5 5l1.41-1.41L17.83 22H26v8h2v-8a2 2 0 0 0-2-2Z'
      />
      <path
        fill='currentColor'
        d='m23.71 9.29l-7-7A1 1 0 0 0 16 2H6a2 2 0 0 0-2 2v24a2 2 0 0 0 2 2h8v-2H6V4h8v6a2 2 0 0 0 2 2h6v2h2v-4a1 1 0 0 0-.29-.71ZM16 4.41L21.59 10H16Z'
      />
    </svg>
  )
}

import { EMode, useApp } from 'context/AppContext'

interface ITabProps {
  mode: EMode
  children: JSX.Element
}

export default function Tab({ mode, children }: ITabProps) {
  const { mode: currentMode, changeMode } = useApp()

  const selected = mode === currentMode && 'tab-selected'

  return (
    <button type='button' className={`tab ${selected}`} onClick={() => changeMode(mode)}>
      {children}
      <span>{mode}</span>
    </button>
  )
}

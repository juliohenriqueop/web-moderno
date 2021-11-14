import { MouseEventHandler, ReactNode } from "react"

export type RectangularButtonProps = {
  className?: string,
  variant?: 'gray' | 'blue' | 'green',
  onClick?: MouseEventHandler,
  children?: ReactNode
}

export default function RectangularButton(props?: RectangularButtonProps) {
  const variant = props?.variant || 'gray'

  const customClassNames = props?.className || ''
  const colorClassNames = `bg-gradient-to-r from-${variant}-400 to-${variant}-700`
  const classNames = `rounded-md px-4 py-2 text-white font-bold ${colorClassNames} ${customClassNames}`

  return (
    <button className={classNames} onClick={props?.onClick}>
      {props?.children}
    </button>
  )
}
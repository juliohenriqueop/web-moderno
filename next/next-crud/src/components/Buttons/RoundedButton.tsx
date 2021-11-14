import { MouseEventHandler, ReactChild } from "react"

export type RoundedButtonProps = {
  className?: string,
  onClick?: MouseEventHandler,
  children: ReactChild
}

export default function RoundedButton(props?: RoundedButtonProps) {
  const customClassNames = props?.className || ''
  const centralizationClassNames = 'd-flex justify-center items-center'
  const classNames = `${centralizationClassNames} rounded-full p-2 m-2 ${customClassNames}`

  return (
    <button className={classNames} onClick={props?.onClick}>
      {props?.children}
    </button>
  )
}
import { FormEvent, ReactNode } from "react"

export type FormProps = {
  onSubmit: (event: FormEvent<HTMLFormElement>) => void,
  children?: ReactNode
}

export default function Form(props: FormProps) {
  return (
    <form className="flex flex-col" onSubmit={props.onSubmit}>
      {props.children}
    </form>
  )
}
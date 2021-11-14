import { Fragment } from "react"

export type inputProps = {
  label: string,
  type: string,
  value?: string | number,
  readOnly?: boolean,
  onChange?: (value: string) => void
}

export default function Input(props: inputProps) {
  const value = props?.value || ''
  const readOnly = props?.readOnly || false

  return (
    <Fragment>
      <label className="mt-4 mb-2">{props.label}</label>
      <input className={`
        bg-gray-100
        border-purple-500
        border
        rounded-lg
        px-4
        py-2
        focus:outline-none
        ${readOnly || 'focus:bg-white'}
      `}
        type={props.type}
        readOnly={readOnly}
        value={value}
        onChange={(event) => props.onChange?.(event.target.value)}
      />
    </Fragment>
  )
}
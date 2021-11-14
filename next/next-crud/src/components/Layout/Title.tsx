import { Fragment, ReactChild } from "react";

export type TitleProps = {
  children: ReactChild
}

export default function Title(props: TitleProps) {
  return (
    <Fragment>
      <h1 className="px-5 py-2 text-2xl">{props.children}</h1>
      <hr className="board border-1 border-purple-500" />
    </Fragment>
  )
}
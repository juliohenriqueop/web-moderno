import React from "react"

import styles from './styles.module.css'

export default function Jsx() {
  const title = <h1>JSX é um conceito central</h1>

  function getSubtitle() {
    return <h2>do {"next.js".toUpperCase()}</h2>
  }

  return (
    <div className={styles.syntax}>
      {title}
      {getSubtitle()}
    </div>
  )
}
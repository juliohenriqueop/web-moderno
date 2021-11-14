import React from 'react'
import styles from './styles.module.css'

export default function Header(props) {
  return (
    <header className={styles.center}>
      <h1>{props.title}</h1>
      <br />
      <p>{props.subtitle}</p>
    </header>
  )
}
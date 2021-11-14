import React from 'react'

import Header from '../Header'
import Menu from '../Menu'

import styles from './styles.module.css'

export default function Layout(props) {
  return (
    <div className={styles.layout}>
      <div className={styles.header}>
        <Header title="Next.js & React" subtitle="Aprenda Next na prática." />
        <Menu />
      </div>
      <div className={styles.content}>
        {props.children}
      </div>
    </div>
  )
}
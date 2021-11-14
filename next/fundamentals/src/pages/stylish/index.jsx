import React from "react"
import Layout from "../../components/Layout"

import styles from "./styles.module.css"

export default function Stylish() {
  return (
    <div className={styles.purple}>
      <h1>Estilizado usando modulo CSS</h1>
    </div>
  )
}
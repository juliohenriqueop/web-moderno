import React from "react";
import { useState, useEffect } from "react";

import styles from './styles.module.css'

export default function Clients() {
  const [clients, setClients] = useState([])

  async function fetchClients() {
    const response = await fetch('http://localhost:3000/api/clients')
    const responseBody = await response.json()

    setClients(responseBody)
  }

  useEffect(fetchClients, [])

  const clientListView = (
    <ul className={styles.list}>
      {clients.map(client =>
        <li className={styles.item} key={client.id}>
          <span className={styles.name}>{client.name}</span>
          <span className={styles.email}>{client.email}</span>
        </li>
      )}
    </ul>
  )

  const loadingView = (
    <h1>Loading....</h1>
  )

  return (
    <div className={styles.clients}>
      {clients.length > 0 ? clientListView : loadingView}
    </div>
  )
}
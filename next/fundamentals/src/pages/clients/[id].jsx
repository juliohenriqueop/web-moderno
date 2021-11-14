import { useState, useEffect } from "react";
import { useRouter } from 'next/router'

import styles from './styles.module.css'

export default function Client() {
  const [client, setClient] = useState({})

  const router = useRouter()
  const clientId = router.query.id

  async function fetchClient() {
    try {
      const response = await fetch(`http://localhost:3000/api/clients/${clientId}`)
      const responseBody = await response.json()

      setClient(responseBody)
    }
    catch {
      setClient(null)
    }
  }

  useEffect(() => clientId && fetchClient(), [clientId])

  function isClientNotFound() {
    return client === null
  }

  function isClientLoading() {
    return client && Object.keys(client).length === 0
  }

  const clientView = isClientNotFound() || (
    <div>
      <h1 className={styles.name}>{client.name}</h1>
      <p className={styles.email}>{client.email}</p>
    </div>
  )

  const clientNotFoundView = (
    <h1>Cliente não encontrado.</h1>
  )

  const loadingView = (
    <h1>Loading...</h1>
  )

  return (
    <div className={styles.clients}>
      {isClientLoading() ? loadingView : clientView}
      {isClientNotFound() && clientNotFoundView}
    </div>
  )
}
import { useRouter } from 'next/router'
import { useEffect, useCallback } from 'react'

import Layout from '../../../components/Layout/Layout'
import ClientForm from '../../../components/Client/ClientForm'
import Client from '../../../core/Client/Client'
import { useClient } from '../../../components/Client/ClientContext'
import { useClientRepository } from "../../../components/Client/ClientRepositoryContext";


export default function ClientEditor() {
  const [client] = useClient()
  const clientRepository = useClientRepository()
  const router = useRouter()

  const redirectToHome = useCallback(() => router.push('/'), [router])

  useEffect(() => {
    if (client.name.length === 0) {
      redirectToHome()
    }
  }, [client, redirectToHome])


  function handleSaveClick(client: Client) {
    clientRepository?.update(client).then(redirectToHome)
  }

  function handleCancelClick() {
    redirectToHome()
  }

  return (
    <Layout title="Editar Cliente">
      <ClientForm
        client={client}
        onSaveClick={handleSaveClick}
        onCancelClick={handleCancelClick}
      />
    </Layout>
  )
}
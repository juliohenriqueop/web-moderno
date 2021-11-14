import { useRouter } from 'next/router'

import Layout from '../../components/Layout/Layout'
import ClientForm from '../../components/Client/ClientForm'
import Client from '../../core/Client/Client'
import { useClient } from '../../components/Client/ClientContext'
import { useClientRepository } from "../../components/Client/ClientRepositoryContext";

export default function ClientCreator() {
  const [client] = useClient()
  const clientRepository = useClientRepository()
  const router = useRouter()

  function redirectToHome() {
    router.push('/')
  }

  function handleSaveClick(client: Client) {
    clientRepository?.create(client).then(redirectToHome)
  }

  function handleCancelClick() {
    redirectToHome()
  }

  return (
    <Layout title="Criar Cliente">
      <ClientForm
        client={client}
        onSaveClick={handleSaveClick}
        onCancelClick={handleCancelClick}
      />
    </Layout>
  )
}
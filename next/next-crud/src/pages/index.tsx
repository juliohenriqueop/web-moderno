import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/router'

import RectangularButton from '../components/Buttons/RectangularButton'
import Layout from '../components/Layout/Layout'
import ClientsTable from '../components/Client/ClientsTable'
import Client from '../core/Client/Client'
import { useClient } from '../components/Client/ClientContext'
import { useClientRepository } from '../components/Client/ClientRepositoryContext'

export default function Home() {
  const [clients, setClients] = useState<Client[]>([])
  const [client, setClient] = useClient()
  const clientRepository = useClientRepository()
  const router = useRouter()

  const fetchClients = useCallback(async () => {
    const updatedClients = await clientRepository?.getAll()
    if (updatedClients) setClients(updatedClients)
  }, [clientRepository])

  useEffect(() => { fetchClients() }, [fetchClients])

  function handleCreateClientClick() {
    setClient(new Client())
    router.push('/clients/create')
  }

  function handleEditClientClick(client: Client) {
    setClient(client)
    router.push(`/clients/${client.id}/edit`)
  }

  async function deleteClient(client: Client) {
    await clientRepository?.delete(client)

    const updatedClients = clients.filter(
      currentClient => currentClient.id !== client.id
    )

    setClients(updatedClients)
  }

  function handleDeleteClientClick(client: Client) {
    deleteClient(client)
  }

  return (
    <Layout title="Cadastro Simples">
      <div className="flex justify-end">
        <RectangularButton className="mb-4" variant="green"
          onClick={handleCreateClientClick}>
          Novo Cliente
        </RectangularButton>
      </div>
      <ClientsTable
        clients={clients}
        onEditClick={handleEditClientClick}
        onDeleteClick={handleDeleteClientClick}>
      </ClientsTable>
    </Layout>
  )
}

import { createContext, ReactNode, useContext } from "react";
import ClientRepository from "../../core/Client/ClientRepository";

type ClientRepositoryContextType = ClientRepository | null

const clientRepositoryContext = createContext<ClientRepositoryContextType>(null)

export type ClientRepositoryContextProps = {
  repository: ClientRepository,
  children?: ReactNode
}

export default function ClientRepositoryContext(props: ClientRepositoryContextProps) {
  return (
    <clientRepositoryContext.Provider value={props.repository}>
      {props?.children}
    </clientRepositoryContext.Provider>
  )
}

export function useClientRepository() {
  if (!clientRepositoryContext)
    throw new Error('useClientRepository should be used within ClientRepositoryContext.')

  const repository = useContext(clientRepositoryContext)

  return repository
}
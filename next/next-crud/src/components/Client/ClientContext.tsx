import { createContext, ReactNode, useState, useContext } from "react";
import Client from "../../core/Client/Client";

type ClientContextType = [Client, (client: Client) => void]

const clientContext = createContext<ClientContextType>([
  new Client(),
  (client: Client) => undefined
])

export type clientContextProps = {
  children?: ReactNode
}

export default function ClientContext(props?: clientContextProps) {
  const [client, setClient] = useState(new Client())

  return (
    <clientContext.Provider value={[client, setClient]}>
      {props?.children}
    </clientContext.Provider>
  )
}

export function useClient(initialClient?: Client) {
  if (!clientContext)
    throw new Error('useClient should be used within ClientContext.')

  const [client, setClient] = useContext(clientContext)
  if (initialClient) setClient(initialClient)

  const clientState: ClientContextType = [client, setClient]
  return clientState
}
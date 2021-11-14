import { Fragment, ReactNode } from "react"
import Client from "../../core/Client/Client"
import RoundedButton from "../Buttons/RoundedButton"
import DeleteIcon from "../Icons/DeleteIcon"
import EditIcon from "../Icons/EditIcon"

export type ClientsTableProps = {
  clients: Array<Client>,
  onEditClick?: (client: Client) => void,
  onDeleteClick?: (client: Client) => void,
  children?: ReactNode
}

export default function ClientsTable(props: ClientsTableProps) {
  function shouldRenderOptions() {
    return props.onEditClick && props.onDeleteClick
  }

  function renderHeader() {
    return (
      <tr>
        <th className="text-left p-4">ID</th>
        <th className="text-left p-4">Nome</th>
        <th className="text-left p-4">Idade</th>
        {shouldRenderOptions() && (
          <th className="p-4">Opções</th>
        )}
      </tr>
    )
  }

  function renderOptions(client: Client) {
    return (
      <Fragment>
        <RoundedButton
          className="hover:bg-purple-50 text-green-600"
          onClick={() => props.onEditClick && props.onEditClick(client)}>
          <EditIcon />
        </RoundedButton>
        <RoundedButton
          className="hover:bg-purple-50 text-red-500"
          onClick={() => props.onDeleteClick && props.onDeleteClick(client)}>
          <DeleteIcon />
        </RoundedButton>
      </Fragment>
    )
  }

  function getRowColorClassName(index: number) {
    const isIndexEven = index % 2 === 0
    return isIndexEven ? 'bg-purple-200' : 'bg-purple-100'
  }

  function renderBody() {
    return props.clients?.map((client, index) => {
      return (
        <tr className={getRowColorClassName(index)} key={client.id}>
          <td className="text-left p-4">{client.id}</td>
          <td className="text-left p-4">{client.name}</td>
          <td className="text-left p-4">{client.age}</td>
          {shouldRenderOptions() && (
            <td className="flex justify-center items-center">
              {renderOptions(client)}
            </td>
          )}
        </tr>
      )
    })
  }

  return (
    <table className="w-full overflow-hidden rounded-md">
      <thead className="text-gray-100 bg-gradient-to-r from-purple-500 to-purple-800">
        {renderHeader()}
      </thead>
      <tbody>
        {renderBody()}
      </tbody>
    </table>
  )
}
import Client from "./Client";

export default interface ClientRepository {
  create(client: Client): Promise<Client>,
  update(client: Client): Promise<Client>,
  delete(client: Client): Promise<void>,
  getAll(): Promise<Client[]>
}
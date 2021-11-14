function getClient(req, res) {
  const clients = [{
    id: 1,
    name: "João",
    email: "joao@cod3r.com.br"
  }, {
    id: 2,
    name: "Maria",
    email: "maria@cod3r.com.br"
  }]

  const clientId = Number(req.query.id) - 1

  if (clients[clientId]) {
    return res.status(200).send(clients[clientId])
  }

  res.status(404).send()
}

export default function Client(req, res) {
  if (req.method === 'GET') {
    return getClient(req, res)
  }

  res.status(405).send()
}
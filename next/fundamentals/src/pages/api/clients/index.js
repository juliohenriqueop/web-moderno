function getClients(req, res) {
  const clients = [{
    id: 1,
    name: "João",
    email: "joao@cod3r.com.br"
  }, {
    id: 2,
    name: "Maria",
    email: "maria@cod3r.com.br"
  }]

  res.status(200).send(clients)
}

export default function clients(req, res) {
  if (req.method === 'GET') {
    return getClients(req, res)
  }

  res.status(405).send()
}
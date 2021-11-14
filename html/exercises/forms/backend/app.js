const express = require('express')
const body_parser = require('body-parser')

const app = express()
app.use(body_parser.urlencoded({
  extended: true
}))

app.post('/users', (req, res) => {
  const {
    name,
    role
  } = req.body

  console.log('POST: ', req.body)
  res.status(200).send(`<h2>Olá ${role} ${name}, seja bem vindo !<h2>`)
})

app.get('/users', (req, res) => {
  console.log('GET: ', req.query)
  res.status(200).send(`<p>Dados atualizados com sucesso.<br/>${JSON.stringify(req.query)}</p>`)
})

app.listen(3003, () => {
  console.log('User registry API is running...')
})
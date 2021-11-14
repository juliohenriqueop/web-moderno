const express = require('express')
const consign = require('consign')

const app = express()
const port = process.env.PORT || 3000

consign({
    cwd: 'src',
    locale: 'pt-br'
  })
  .include('errors')
  .then('configuration')
  .then('localizations/pt_br')
  .then('http/responses/status-codes.js')
  .then('http/responses/send-response.js')
  .then('http/responses/send-error-response.js')
  .then('http')
  .then('repositories')
  .then('authentication')
  .then('validation')
  .then('controllers')
  .then('routes')
  .then('statistics')
  .into(app)

app.listen(port, () => {
  console.log(`Server is running at port ${port}.`)
})
const express = require('express')
const bodyParser = require('body-parser')
const usersAPI = require('./api/users')
const productsAPI = require('./api/products')

const app = express()

const logRequestMiddleware = require('./middlewares/log-request')

app.use(bodyParser.text())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(logRequestMiddleware('Request received'))

productsAPI(app, 'iPhoneX')

app.post('/users', usersAPI.save)
app.get('/users', usersAPI.get)

app.get('/users/logs', (req, res) => {
  res.send(`Logs from user with id ${req.query.id} from the year of ${req.query.year} was selected !`)
})

app.get('/users/:id', (req, res) => {
  res.send(`User ${req.params.id} was selected !`)
})

app.post('/body', (req, res) => {
  let body = ''

  req.on('data', chunk => {
    body = body.concat(chunk)
  })

  req.on('end', () => {
    res.send(body)
  })
})

app.post('/body-parser', (req, res) => {
  res.send(req.body)
})

app.listen(3000, () => {
  console.log('Server is running at port 3000.')
})
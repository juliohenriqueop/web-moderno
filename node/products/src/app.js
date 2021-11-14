const express = require('express')
const body_parser = require('body-parser')

const ProductController = require('./controllers/product-controller')

const app = express()
app.use(body_parser.urlencoded({
  extended: true
}))

app.post('/products', ProductController.handlePost)

app.get('/products', ProductController.handleGetWithQuery)
app.get('/products', ProductController.handleGetOnRoot)

app.put('/products', ProductController.handlePut)

app.delete('/products', ProductController.handleDelete)

app.listen(8080, () => {
  console.log('Product API service is running.')
})
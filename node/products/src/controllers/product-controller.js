const ProductModel = require('../models/product-model')

function handlePost(req, res, next) {
  const {
    name,
    price
  } = req.body

  const product = ProductModel.createProduct(name, price)

  if (product === null) {
    res.status(400).send()
    return
  }

  res.status(201).send(product)
}

function handleGetWithQuery(req, res, next) {
  const {
    id
  } = req.query

  if (id === undefined) {
    next()
    return
  }

  const product = ProductModel.getProduct(id)

  if (product === null) {
    res.status(404).send()
    return
  }

  res.send(product)
}

function handleGetOnRoot(req, res, next) {
  res.send(ProductModel.listProducts())
}

function handlePut(req, res, next) {
  const {
    id,
    name,
    price
  } = req.query
  const product = ProductModel.editProduct(id, name, price)

  if (product === null) {
    res.status(400).send()
    return
  }

  res.send(product)
}

function handleDelete(req, res, next) {
  const {
    id
  } = req.query
  const deleted = ProductModel.deleteProduct(id)

  if (deleted === false) {
    res.status(400).send()
    return
  }

  res.status(204).send()
}

module.exports = {
  handlePost,
  handleGetWithQuery,
  handleGetOnRoot,
  handlePut,
  handleDelete
}
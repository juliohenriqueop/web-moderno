const products = []
let next_id = 0

function generateId() {
  return next_id++
}

function validateProduct(value, index, array) {
  return !!array[index]
}

function createProduct(name, price) {
  if (name && price) {
    const id = generateId()
    const product = {
      id,
      name,
      price
    }

    products.push(product)

    return product
  }
  return null
}

function getProduct(id) {
  const product = products[id]
  return product || null
}

function listProducts() {
  const valid_products = products.filter(validateProduct)
  return valid_products
}

function editProduct(id, name, price) {
  if (id && name && price) {
    const product = products[id]

    if (product) {
      product.name = name
      product.price = price

      return {
        id,
        ...product
      }
    }

    return null
  }
  return null
}

function deleteProduct(id) {
  delete products[id]
  const is_deleted = !products[id]

  return is_deleted
}

module.exports = {
  createProduct,
  getProduct,
  listProducts,
  editProduct,
  deleteProduct
}
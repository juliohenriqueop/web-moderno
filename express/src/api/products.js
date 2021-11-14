module.exports = (app, productName) => {
  function save(req, res) {
    res.send(`Product ${productName} was created !`)
  }

  function get(req, res) {
    res.send(`Product ${productName} was selected !`)
  }

  app.post('/products', save)
  app.get('/products', get)
}
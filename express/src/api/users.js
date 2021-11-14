function save(req, res) {
  res.send('User was saved !')
}

function get(req, res) {
  res.send('User was selected !')
}

module.exports = {
  save,
  get
}
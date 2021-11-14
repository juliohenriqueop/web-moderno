const bcrypt = require('bcrypt')

module.exports = function(app) {
  async function encryptPassword(password) {
    const salt = await bcrypt.genSalt()
    const hash = await bcrypt.hash(password, salt)

    return hash
  }

  async function comparePassword(password, hash) {
    const match = await bcrypt.compare(password, hash)
    return match
  }

  return {
    encryptPassword,
    comparePassword
  }
}
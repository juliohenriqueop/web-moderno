const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

function showGenericWelcomeMessage() {
  process.stdout.write('Hello, be welcome !\n')
}

function showCustomizedWelcomeMessage(name) {
  process.stdout.write(`Hello ${name}, welcome back!\n`)
}

function askUserName(handleAnswer) {
  return rl.question('Insert your name: ', handleAnswer)
}

function finish() {
  rl.close()
  process.exit()
}

const anonymous_user = process.argv.indexOf('-a') >= 0

if (anonymous_user) {
  showGenericWelcomeMessage()
  finish()
} else {
  askUserName(name => {
    showCustomizedWelcomeMessage(name)
    finish()
  })
}
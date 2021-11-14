const express = require('express')
const bodyParser = require('body-parser')
const multer = require('multer')

const app = express()

app.use(express.static('.'))
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())

const storage = multer.diskStorage({
  destination: function(request, file, callback) {
    callback(null, './upload')
  },

  filename: function(request, file, callback) {
    callback(null, `${Date.now()}_${file.originalname}`)
  }
})

const upload = multer({
  storage
}).single('arquivo')

app.post('/upload', (request, response) => {
  response.contentType('text/plain')

  upload(request, response, function(error) {
    if (error) {
      return response.end(`Error: ${error.code} - ${error.message}.`)
    } else {
      return response.end('File was uploaded successfully.')
    }
  })
})

app.post('/form', (request, response) => {
  response.send({
    id: 1,
    ...request.body,
  })
})

app.get('/even', (request, response) => {
  const number = parseInt(request.query.number)
  const isEven = number % 2 === 0

  response.contentType('text/plain')
  response.end(isEven ? 'Par' : 'Impar')
})

app.listen(8080, () => {
  console.log('The server is online !')
})
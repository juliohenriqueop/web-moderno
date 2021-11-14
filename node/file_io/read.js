const fs = require('fs')
const path = require('path')

const config_file = path.normalize(__dirname + '/config.json')


const data = fs.readFileSync(config_file, 'UTF-8')
console.log(data)



fs.readFile(config_file, 'UTF-8', (error, data) => {
  const config = JSON.parse(data)

  console.log(`${config.db.host}:${config.db.port}`)
})



const config = require('./config.json')
console.log(config.db)



fs.readdir(__dirname, (error, file_names) => {
  file_names.map(current_file_name => {
    const file_path = path.normalize(`${__dirname}/${current_file_name}`)
    console.log(file_path)
  })
})
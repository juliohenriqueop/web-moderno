function getMessage(name, message_type = 'SUCCESS') {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (message_type === 'SUCCESS') {
        resolve(`Hello ${name}, be welcome !`)
      } else {
        const error = new Error('Something went wrong !')
        reject(error)
      }
    }, 10000)
  })
}

getMessage('João', 'SUCCESS')
  .then(message => {
    console.log(message)

    return 'Step 1: done !'
  })
  .then(message => {
    console.log(message)

    return 'Step 2: done !'
  })
  .then(message => {
    console.log(message)
  })

getMessage('Maria', 'ERROR')
  .catch(error => {
    console.log(error.message)
  })
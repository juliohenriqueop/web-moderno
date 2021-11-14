function waitFor(time = 2000) {
  console.log('Executando promise...')
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, time)
  })
}

waitFor()
  .then(waitFor)
  .then(waitFor)
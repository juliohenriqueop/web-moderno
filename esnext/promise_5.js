function mayFail(value, failureChance) {
  return new Promise((resolve, reject) => {
    if (Math.random() < failureChance)
      reject('ops')
    else
      resolve(value)
  })
}

mayFail('ok', 0.5)
  .then(value => console.log(`The operation was executed successfully: ${value}.`))
  .then((value) => anyErrorHereGoesToCatch(), (error) => treatTheErrorForThisThenNeverCallsCatch())
  .catch(error => console.log(`An error has happened: ${error}.`))
  .then(none => console.log('Done.'))
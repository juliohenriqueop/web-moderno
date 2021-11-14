function waitFor(time = 2000) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, time)
  })
}

function returnValue() {
  return new Promise(resolve => {
    setTimeout(() => resolve(10), 5000)
  })
}

async function execute() {
  await waitFor(1500)
  console.log('waitFor: execution 1.')

  await waitFor(1500)
  console.log('waitFor: execution 2.')

  await waitFor(1500)
  console.log('waitFor: execution 3.')

  const value = await returnValue()
  return value
}

execute().then(value => console.log(value))
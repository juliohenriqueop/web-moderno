const value = 'Global'

function logValueNow() {
  const value = 'Local'


  function logValue() {
    console.log('Value:', value)
  }

  return logValue()
}


const run = logValueNow

run()
const value = 'Global'


function logValue() {
  console.log('Value:', value)
}

function logValueNow() {
  const value = 'Local'


  logValue()
}


logValueNow()
function factorize(value) {

  const getNumberLength = value => Math.ceil(Math.log10(value + 1))

  const findDivisor = value => {
    let factor = 2

    while ((value % factor) > 0) {
      factor++
    }

    return factor
  }

  const initial_value_length = getNumberLength(value)

  while (true) {
    const divisor = findDivisor(value)

    value /= divisor

    const current_value_length = getNumberLength(value)
    const separation = ' '.repeat(initial_value_length - current_value_length) + '|'

    console.log(value, separation, divisor)

    if (value <= 1)
      break
  }
}

factorize(6552)
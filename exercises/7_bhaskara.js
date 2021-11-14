function changeNumericPrecision(value, precision) {
  if (!Number.isInteger(value)) {
    const magic = (1 * (10 ** precision))
    return ((Math.round(value * magic)) / magic)
  }
  return value
}

function solveBhaskara(a, b, c) {
  let delta = (b ** 2) - (4 * a * c)

  if (delta < 0) {
    return 'Delta is negative.'
  }

  let x = []

  x[0] = changeNumericPrecision((-b + Math.sqrt(delta)) / (2 * a), 2)
  x[1] = changeNumericPrecision((-b - Math.sqrt(delta)) / (2 * a), 2)

  return x
}

console.log(solveBhaskara(3, -5, 12))

console.log(solveBhaskara(1, 12, -13))

console.log(solveBhaskara(2, -16, -18))

console.log(solveBhaskara(1, 2, 3))
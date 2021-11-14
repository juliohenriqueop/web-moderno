function getTriangleCategory(x, y, z) {

  if (isNaN(x) || isNaN(y) || isNaN(z))
    return 'Inválido.'

  if (x === y && y === z)
    return 'Equilátero.'

  if (x === y || x === z || y === z)
    return 'Isósceles.'

  return 'Escaleno.'
}

console.log(getTriangleCategory())

console.log(getTriangleCategory(1, 1, 1))

console.log(getTriangleCategory(1, 2, 2))

console.log(getTriangleCategory(1, 2, 3))
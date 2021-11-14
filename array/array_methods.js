const pilots = ['Vettel', 'Alonso', 'Raikkonen', 'Massa']

pilots.pop()
console.log(pilots)


pilots.push('Verstappen')
console.log(pilots)


pilots.shift()
console.log(pilots)


pilots.unshift('Hamilton')
console.log(pilots)


pilots.splice(2, 0, 'Bottas', 'Massa')
console.log(pilots)


const podium = pilots.slice(0, 3)
console.log(podium)

const stragglers = pilots.slice(4, 6)
console.log(stragglers)
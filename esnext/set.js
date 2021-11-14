const teams = new Set()
teams.add('Vasco')
teams.add('São Paulo').add('Palmeiras').add('Corinthians')
teams.add('Flamengo')

teams.add('Vasco')

console.log(teams)

console.log('Size:', teams.size)

console.log(teams.has('Vasco'))

console.log(teams.has('vasco'))


const names = ['Raquel', 'Lucas', 'Julia', 'Lucas']
const set_of_names = new Set(names)

console.log(set_of_names)

console.log(set_of_names.size)
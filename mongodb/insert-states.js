db.createCollection('states')

db.states.insert({
  name: 'Acre',
  abbreviation: 'AC',
  region: 'Norte'
})

db.states.save({
  name: 'Alagoas',
  abbreviation: 'AL',
  region: 'Nordeste',
  population: 3337357
})

db.states.insert({
  name: 'Rio de Janeiro',
  abbreviation: 'RJ',
  region: 'Sudeste',
  cities: [{
    _id: ObjectId(),
    name: 'Niterói',
    area: 129.3,
    population: 513584
  }]
})
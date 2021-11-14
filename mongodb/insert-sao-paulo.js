db.states.insert({
  name: 'São Paulo',
  abbreviation: 'SP',
  region: 'Sudeste',
  cities: [{
      _id: ObjectId(),
      name: 'Campinas',
      area: 797.6,
      mayor: 'Jonas Donizette',
      population: 1213792
    },
    {
      _id: ObjectId(),
      name: 'Guarulhos',
      population: 1392121
    },
    {
      _id: ObjectId(),
      name: 'Sorocaba',
      distanceFromCapital: 83.5,
      population: 687357
    }
  ]
})
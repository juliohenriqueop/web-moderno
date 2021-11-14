db.states.update({
  abbreviation: 'SP'
}, {
  $set: {
    population: 45919049
  }
})

db.states.update({
  abbreviation: 'AL'
}, {
  $set: {
    cities: [{
      name: 'Sergipe'
    }]
  }
})

db.states.update({
  abbreviation: 'SP'
}, {
  $push: {
    cities: {
      name: 'Santos',
      population: 433311
    }
  }
})

db.states.update({
  abbreviation: 'SP',
  ['cities.name']: 'Santos'
}, {
  $set: {
    ['cities.$._id']: ObjectId()
  }
})

db.states.find({
  population: {
    $exists: true
  }
}, {
  _id: 0,
  name: 1
})
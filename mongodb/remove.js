db.states.count()

db.states.remove({
  abbreviation: 'AC'
})

db.states.count()

db.states.remove({
  population: {
    $exists: true
  }
}, 1)

db.states.count()

db.states.update({
  abbreviation: 'RJ'
}, {
  $set: {
    population: 17366189
  }
})

db.states.remove({
  population: {
    $lt: 20000000
  }
}, 1)

db.states.update({
  abbreviation: 'SP'
}, {
  $pull: {
    cities: {
      name: 'Santos'
    }
  }
})
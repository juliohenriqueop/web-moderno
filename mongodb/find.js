db.states.find().pretty()

db.states.findOne({
  abbreviation: 'RJ'
})

db.states.find({
  $or: [{
      abbreviation: 'RJ'
    },
    {
      abbreviation: 'AC'
    }
  ]
}).pretty()

db.states.find({
  population: {
    $exists: true
  }
}).pretty()

db.states.find().skip(1).limit(2).pretty()

db.states.count()

db.states.find({
  abbreviation: 'SP'
}, {
  _id: 0,
  name: 1,
  abbreviation: 1
}).pretty()

db.states.find({
  abbreviation: 'SP'
}, {
  _id: 0,
  ["cities.name"]: 1
}).pretty()
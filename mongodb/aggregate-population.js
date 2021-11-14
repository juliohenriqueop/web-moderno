db.states.aggregate([{
  $project: {
    _id: 0,
    name: 1,
    ['cities.name']: 1
  }
}])

db.states.aggregate([{
    $project: {
      _id: 0,
      abbreviation: 1,
      population: {
        $sum: '$cities.population'
      }
    }
  },
  {
    $group: {
      _id: null,
      total: {
        $sum: '$population'
      }
    }
  },
  {
    $project: {
      _id: 0,
      total: 1
    }
  }
])
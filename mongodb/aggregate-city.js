db.states.aggregate([{
    $match: {
      ['cities.name']: 'Sorocaba'
    }
  },
  {
    $unwind: '$cities'
  },
  {
    $match: {
      ['cities.name']: 'Sorocaba'
    }
  },
  {
    $project: {
      _id: '$cities._id'
    }
  }
]).pretty()
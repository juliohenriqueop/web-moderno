db.companies.aggregate([{
    $match: {
      name: 'Bradesco'
    }
  },
  {
    $lookup: {
      from: 'states',
      localField: 'state_id',
      foreignField: '_id',
      as: 'state'
    }
  },
  {
    $unwind: '$state'
  }
]).pretty()

db.companies.aggregate([{
    $match: {
      name: 'Vale'
    }
  },
  {
    $lookup: {
      from: 'states',
      localField: 'city_id',
      foreignField: 'cities._id',
      as: 'state'
    }
  },
  {
    $unwind: '$state'
  },
  {
    $unwind: '$state.cities'
  },
  {
    $addFields: {
      target_city: {
        $cmp: ['$state.cities._id', '$city_id']
      }
    }
  },
  {
    $match: {
      target_city: 0
    }
  }
]).pretty()
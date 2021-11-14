const user_info = 'Fulano da Silva, 32 years old.'

const removeComma = str => str.replace(',', '')

const extractFirstName = str => str.substr(0, str.indexOf(' ', ))

function extractLastName(str) {
  let first_comma_pos = str.indexOf(',')
  let first_space_before_comma_pos = str.lastIndexOf(' ', first_comma_pos)

  return str.substr(
    first_space_before_comma_pos + 1,
    first_comma_pos - first_space_before_comma_pos - 1
  )
}

const extractAge = str => parseInt(str.substr((str.indexOf('years') - 4), 3))

const getBornYear = age => (new Date).getFullYear() - age

const user = {
  name: extractFirstName(user_info),
  surname: extractLastName(user_info),
  age: extractAge(user_info)
}

const message = `
    ${user.surname}, ${user.name} are born in ${getBornYear(user.age)}.
`

console.log(message)
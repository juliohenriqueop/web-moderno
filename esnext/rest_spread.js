function rest(...params) {
  params.forEach(current_param => {
    console.log(current_param)
  })
}

rest('a', 'e', 'i', 'o', 'u')



const employee = {
  name: 'Maria',
  salary: 12348.99
}

const obj_spread = {
  ...employee,
  active: true
}

console.log(obj_spread)



const group_a = ['João', 'Pedro', 'Gloria']
const group_b = ['Maria', 'Rafaela']

const arr_spread = [...group_b, ...group_a]

console.log(arr_spread)
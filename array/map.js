const nums = [1, 2, 3, 4, 5]

let result = nums.map((element) => {
  return element * 2
})

console.log(result)



const sum10 = element => element + 10
const triple = element => element * 3

const toMoney = element => {
  return `R$${parseFloat(element).toFixed(2).replace('.', ',')}.`
}

result = nums.map(sum10).map(triple).map(toMoney)
console.log(result)
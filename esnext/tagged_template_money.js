function BRL(content, ...params) {
  const result = []

  content.forEach((current_content, index) => {
    const current_param = params[index]
    const value = isNaN(current_param) ? current_param : `R$${current_param.toFixed(2)}`

    result.push(current_content, value)
  });

  return result.join('')
}

const price = 29.9

console.log(BRL `1x de ${price} ou 12x de ${price / 12}.`)
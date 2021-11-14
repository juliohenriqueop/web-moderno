function isFruitAvailable(name) {
  switch (name.toLowerCase()) {
    case 'maçã': {
      console.log('Não vendemos maçãs aqui !')
      break
    }
    case 'kiwi': {
      console.log('Estamos com escassez de kiwis !')
      break
    }
    case 'melancia': {
      console.log('Aqui está sua melancia, são 3 reais o quilo !')
      break
    }
    default: {
      console.log('Erro: fruta desconhecida !')
      break
    }
  }
}

isFruitAvailable('Maçã')

isFruitAvailable('Kiwi')

isFruitAvailable('Melancia')

isFruitAvailable('Abacate')
function yell(obj) {

  try {
    console.log(obj.message.toUpperCase(), '!!!')
  } catch (error) {
    console.log(error.message.toUpperCase(), '!!!')
  } finally {
    console.log("done!")
  }
}

yell({
  message: 'hello fucking word'
})

yell()
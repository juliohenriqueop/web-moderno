function Video(title, id) {
  this.title = title
  this.id = id
}

const video1 = new Video('Welcome', 123)
const video2 = new Video('I see you soon.', 456)

console.log(video1)
console.log(video2)



function instantiate(fun, ...params) {
  const obj_instance = {}

  obj_instance.__proto__ = fun.prototype;
  fun.apply(obj_instance, params)

  return obj_instance
}

const video4 = instantiate(Video, 'Welcome', 123)
const video5 = instantiate(Video, 'I see you soon', 456)

console.log(video4)
console.log(video5)
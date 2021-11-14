const singleton_a = require('./single_instance')
const singleton_b = require('./single_instance')

singleton_a.increment()
singleton_a.increment()

console.log(singleton_b.counter)


const factory_a = require('./factory_export')()
const factory_b = require('./factory_export')()

factory_a.increment()
factory_a.increment()

console.log(factory_b.counter)
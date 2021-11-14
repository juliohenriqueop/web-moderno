export default class Client {
  #id: string | null
  #name: string
  #age: number

  constructor(name: string = '', age: number = 0, id: string | null = null) {
    this.#id = id
    this.#name = name
    this.#age = age
  }

  get id() {
    return this.#id
  }

  get name() {
    return this.#name
  }

  get age() {
    return this.#age
  }
}
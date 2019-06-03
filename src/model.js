class Model {
  constructor (opt) {
    let _ = this._ = {
      opt: opt
    }

    get modelName () {
      return this._.option.modelName
    }
  }
}

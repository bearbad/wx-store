import Model from './model.js'
class Modello {
  constructor () {
    this._ = {
      store: {},
      model: Model
    }
  }

  get Model () {
    return this._.model
  }

  reg (model) {
    let Model = this.Model
    if (!(model instanceof Model)) {
      return this.reg(new Model(model))
    }
    this._.store[model.modelName] = model
  }

  getModel (model) {
    return this._.store[model]
  }
}

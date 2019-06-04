import Model from './model.js'
const DEFAULT_MODULE = 'default'
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

  getCurrState (modello) {
    if (!modello) return

    let models = [].concat(modello)
    let result = {}
    models.forEach(item => {
      let model = this.getModel(item.model)
      let modelState = result[model.modelName] = {}
      let optionStates = item.states || [DEFAULT_MODULE]
      Object.assign(modelState, model.getState(optionStates))
    })

    return result
  }
}
export default Modello

class Model {
  constructor (opt) {
    let _ = this._ = {
      opt: opt
    }
  }

  get modelName () {
    return this._.option.modelName
  }

  getDefaultState () {
    let _state = this._.option.state
    return _state ? _state() : undefined
  }

  getModState (mod) {
    if (mod === 'default') {
      return this.getDefaultState()
    }

    let mixins = this._.option.mixins
    let modState = mixins[mod].state
    return modState ? modState() : undefined
  }

  state () {
    let result = this.getDefaultState()
    let mixins = this._.option.mixins

    for(let mod in mixins) {
      let modState = this.getModState(mod)
      if (modState !== undefined) {
        if (!result) result = {}
        result[mod] = modState
      }
    }

    return result
  }

  getState (states) {
    if (!states) {
      return this.state()
    }

    if (!Array.isArray(states)){
      states = [states]
    }

    return states.reduce((result, mod) => {
      let modState = this.getModState(mod)
      if (modState !== undefined) {
        if (!result) result = {}
        if (mod === 'default') {
          Object.assign(result, modState)
        } else {
          result[mod] = modState
        }
      }
      return result
    }, undefined)
  }
  
}
export default Model

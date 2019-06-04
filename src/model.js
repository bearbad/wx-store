class Model {
  constructor (opt) {
    let _ = this._ = {
      opt: opt,
      actions: {},
      mutations: {},
      actionModMap: {},
      mutationModMap: {}
    }

    let { mixins } = opt
    let { actions, actionModMap, mutationModMap, mutations } = _

    // mix module
    let types = ['actions', 'mutations']
    types.forEach(type => {
      // mix default module
      if (!opt.hasOwnProperty(type)) {
        opt[type] = {}
      }
      _[type].default = opt[type]

      // mix naming modules
      for(let name in mixins) {
        let mod = mixins[name]
        if (!mod.hasOwnProperty(type)) {
          mod[type] = {}
        }
        _[type][name] = mod[type]
      }
    })

    // build action-->mod map
    for(let mod in actions) {
      Object.keys(actions[mod]).forEach((action) => {
        actionModMap[action] = mod
      })
    }

    // build mutation-->mod map
    for(let mod in mutations) {
      Object.keys(mutations[mod]).forEach((mutation) => {
        mutationModMap[mutation] = mod
      })
    }

    _.defaultStateKeys = []
    let defaultState = this.getDefaultState()
    if (typeof(defaultState) === 'object' && defaultState) {
      _.defaultStateKeys = Object.keys(defaultState)
    }
  }

  get defaultStateKeys () {
    return this._.defaultStateKeys
  }

  get modelName () {
    return this._.opt.modelName
  }

  getDefaultState () {
    let _state = this._.opt.state
    return _state ? _state() : undefined
  }

  getModState (mod) {
    if (mod === 'default') {
      return this.getDefaultState()
    }

    let mixins = this._.opt.mixins
    let modState = mixins[mod].state
    return modState ? modState() : undefined
  }

  state () {
    let result = this.getDefaultState()
    let mixins = this._.opt.mixins

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

  getStateActions (state) {
    return this._.actions[state]
  }

  getStateMutations (state) {
    return this._.mutations[state]
  }

  applyAction (state, action, args) {
    if (state !== 'default' && !this._.actions[state][action]) {
      state = 'default'
    }

    let result = this._.actions[state][action].apply(null, args)
    if (result && result.then) {
      return result
    }
  }
}
export default Model

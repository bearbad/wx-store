import Model from './model.js'
import UTIL from './util.js'
const DEFAULT_MODULE = 'default'

function makeActionDispatcher(opt, model, state, statePath) {
  let mutations = model.getStateMutations(state)

  return function dispatch(action) {
    let context = UTIL.makeActionContext(
      mutations,
      UTIL.getObjByPath(opt.data, statePath),
      dispatch,
      opt.setData
    )

    let args = Array.from(arguments)
    args.shift()
    args.unshift(context)

    let result = model.applyAction(state, action, args)
    if (result && result.then) {
      return result
    }
  }
}

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

  getMethods (opt) {
    let modello = opt.modello
    if (!modello) return

    let models = [].concat(modello)

    let existsDefaultModel = false
    models.forEach((modelOption) => {
      let { model, actions, mutations = [], actionAlias = {}, mutationAlias = {} } = modelOption

      model = this.getModel(model)
      let states = modelOption.states
      if (!modelOption.states) {
        states = [DEFAULT_MODULE]
      }

      let modelName = model.modelName

      let methods = {}

      states.forEach(function (state) {
        let statePath = modelName
        if (state !== DEFAULT_MODULE) {
          statePath += '.' + state
        }

        // inject actions
        // all mudule actions will auto inject if no givens
        if (actions !== false) {
          let stateAllActions = Object.keys(model.getStateActions(state))
          let injectActions = stateAllActions

          if (Array.isArray(actions)) {
            // injectActions = actions.filter(_ => stateAllActions.includes(_))
          } else if (typeof actions === 'object' && actions.hasOwnProperty(state)) {
            let stateActions = actions[state]
            if (Array.isArray(stateActions)) {
              injectActions = stateActions.filter(_ => stateAllActions.includes(_))
            } else if (stateActions === false) {
              injectActions = []
            }
          }

          if (injectActions.length) {
            let dispatch = makeActionDispatcher(opt, model, state, statePath)

            injectActions.forEach(action => {
              let methodName = actionAlias[action] || action
              methods[methodName] = dispatch.bind(null, action)
            })
          }
        }
      })
      if ((modelOption.default || models.length === 1)
        && !existsDefaultModel) {
        existsDefaultModel = true
        opt.$model = Object.assign({}, methods)
      } else {
        for (let m in methods) {
          if (!opt.$model[m]) {
            opt.$model[m] = methods[m]
          }
        }
      }
      opt.$model[modelName] = methods
    })
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

module.exports = {
  modelName: 'Test',

  state () {
    return {
      number: '1',
      query: {}
    }
  },

  wxApi: {
    getTest: {
      parameters: {
        valuePath: 'query'
      }
    }
  },

  actions: {
    createTest ({ dispatch, commit }) {
      commit('createTestInMutations')
      return dispatch('create')
    },

    create ({ dispatch, commit, state }) {
      console.log(state)
      console.log('执行create')
    }
  },

  mutations: {
    createTestInMutations (state, setData) {
      setData({
        Test: {
          number: 3
        }
      })
    }
  }
}

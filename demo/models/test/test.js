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
    },

    updateTestName ({dispatch, commit, state}) {
      console.log('updateTestName', state)
      // commit('updateTestName')
      return dispatch('getTest')
    }
  },

  mutations: {
    updateTestName (state, setData) {
      state.query.age = 20
      setData({
        Test: state
      })
    },
    createTestInMutations (state, setData) {
      setData({
        Test: {
          number: 3
        }
      })
    }
  }
}

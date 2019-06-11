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

    updateTestName ({dispatch, commit, state}, params) {
      // 获取传递参数 params
      console.log('updateTestName', state, params)
      // 可以更改state状态 页面上不会有任何ui变化
      // state.query.age = 38
      // 通过commit方式可以改变UI变化
      // commit('updateTestName')
      // dispatch 第二个参数也可以覆盖最终的参数
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

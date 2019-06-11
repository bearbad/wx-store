const app = getApp()
Page({
  modello: [{
    model: 'Test',
    states: ['default']
  }],

  data: {
    name: 2
  },

  onLoad: function (option) {
    console.log('load', option)
  },

  // listen input
  inputEvent (e) {
    let item = e.currentTarget.dataset.model
    this.$setData({
      [item]: e.detail.value
    })
  },

  // page send params
  formEvent (e) {
    this.$model.getTest(this.data)
      .then(res => {
        console.log(res)
      }).catch(error => {
        console.log(error)
      })
  },

  // page send without params
  formEvent1 (e) {
    this.$model.getTest()
      .then(res => {
        console.log(res)
      }).catch(error => {
        console.log(error)
      })
  },

  testEvent () {
    this.$model.updateTestName()
      .then(res => {
        console.log(res)
      }).catch(error => {
        console.log(error)
      })
  }
})

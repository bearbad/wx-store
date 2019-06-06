const app = getApp()
Page({
  modello: [{
    model: 'Test',
    states: ['default']
  }],

  data: {
    name: 2
    // count: app.globalData.count
  },

  onLoad: function (option) {
    console.log('load', option)
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

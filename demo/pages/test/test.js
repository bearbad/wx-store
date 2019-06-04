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

  testEvent () {
    this.$model.Test.createTest({test: 'test'})
  }
})

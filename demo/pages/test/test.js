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
    this.$model.getTest()
    // this.$model.Test.createTest({test: 'test'})
    // this.setData({
    //   Test: {
    //     number: 4
    //   }
    // })
  }
})

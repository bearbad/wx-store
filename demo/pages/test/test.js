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

  inputEvent (e) {
    this.data.Test.query.name = e.detail.value
    this. $setData({
      Test: this.data.Test
    })
  },

  formEvent (e) {
    this.$model.updateTestName()
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

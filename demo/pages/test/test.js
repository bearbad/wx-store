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
    console.log('全局数据状态', app.globalData)
    app.globalData.count = 2
    console.log('onLoad', option)
  },

  onReady () {
    console.log('onReady')
  },

  onShow: function () {
    console.log('onShow')
  },

  onHide () {
    console.log('onHide')
  },

  onUnload () {
    console.log('onUnload')
  },

  to () {
    wx.navigateTo({
      url: '/pages/home/home'
    })
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

  formEvent2 (e) {
    this.$model.updateTestName()
      .then(res => {
        console.log(res)
      }).catch(error => {
        console.log(error)
      })
  },

  formEvent3 (e) {
    this.$model.updateTestName(this.data)
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

// pages/mes/mes.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      zichan:[],
      modalName:''
  },
  scan : function() {
    var that = this;
    wx.scanCode({
      success: (res) => {
        that.setData({
          modalName: 'Image'
        })
        console.log(res.result)
        var str = res.result;
        var arr = str.split("/")[0];
        console.log(arr)
        wx.request({
          url: getApp().globalData.urlpath +"/smZichan",
          data: {
            rescode:arr,
            authen: "JXU3OUZCJXU1MkE4JXU4RDQ0JXU0RUE3JXU2MjZCJXU3ODAx",
          },
          method: "GET",
          success: function (res) {
            console.log(res.data)
            that.setData({
              zichan: res.data,
              modalName: ''
            })
          }
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
// pages/Detial_Message/Detial_Message.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    str: '',
    key: '',
    list : ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      str: options.detail
    })
    var str = this.data.str;
    var that = this;

    wx.request({
      //url: 'https://wxdc.bsrse.com:10003/lookupdetail.php',
      //url: 'http://127.0.0.1:8000/Detail',
      url: getApp().globalData.urlpath +'/Detail',
      data: {
        FormID: str,
      },
      method: 'POST',
      //header: {
        //"Content-Type": "application/x-www-form-urlencoded"
      //},
      success: function (res) {
        var list = new Array();
        list = res.data;
        that.setData({
          list: list
        });
      }
    })
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

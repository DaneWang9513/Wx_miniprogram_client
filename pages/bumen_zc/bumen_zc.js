// pages/bumen_zc/bumen_zc.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    TabCur: 0,
    scrollLeft:0,
    zichan:[],
    modalName:'',
    is_show:0
  },

  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id-1)*60,
      is_show:e.currentTarget.dataset.id
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var mes_dept = getApp().globalData.mes_dept;
    that.setData({
      modalName: 'Image'
    })
    wx.request({
      url: getApp().globalData.urlpath +"/bumenTz",
      data: {
        d_code:mes_dept,
        authen: "JXU3OUZCJXU1MkE4JXU5MEU4JXU5NUU4JXU1M0YwJXU4RDI2",
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
// pages/Message_2Form/Message_2Form.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list : "",
    modalName: 'Modal',
  },

  hideModal(e) {
    this.setData({
      modalName: null
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getConnectToDB();
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
    wx.showToast({
      title: '正在刷新数据...',
      icon: 'loading',
      duration: 2000
    });
    this.setData({ fabus: [] });//先清空数据
    //this.loadIndex();//再重新加载数据
    this.getConnectToDB();

    this.animation = wx.createAnimation({
      duration: 400, // 整个动画过程花费的时间，单位为毫秒
      timingFunction: "ease", // 动画的类型
      delay: 0 // 动画延迟参数
    })
    wx: wx.stopPullDownRefresh();//停止刷新操作
  
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
  
  },
  //查看已发起
  InitialFind: function (e) {
    this.getConnectToDB();
    wx.switchTab({
      url: '../Message_1Form/Message_1Form'
    })
  },

  //查看已签到
  Sign_inFind: function (e) {
    wx.switchTab({
      url: '../Message_2Form/Message_2Form'
    })
  },

  //与数据库连接，更新列表
  getConnectToDB : function () {
    var that = this;
    wx.request({
      //url: 'https://wxdc.bsrse.com:10003/lookparticipate.php',
      url: getApp().globalData.urlpath +'/SearchPatic',
      method: 'POST',
      data: {
        studentID: getApp().globalData.username,
        studentName :getApp().globalData.first_name
      },
      //header: {
        //"Content-Type": "application/x-www-form-urlencoded"
      //},
      success : function(res) {
        console.log(res.data)
        var list = new Array();
        list = res.data;
        that.setData({
          list: list
        })
      },
      
    })
  }
})
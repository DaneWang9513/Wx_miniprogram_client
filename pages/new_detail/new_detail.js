// pages/Detial_Message/Detial_Message.js
var WxParse = require('../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    str: '',
    key: '',
    list: "",
    date:"",
    user:"",
    subject:""
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
      url: getApp().globalData.urlpath +'/News_detail',
      data: {
        id: str,
      },
      method: 'POST',
      //header: {
      //"Content-Type": "application/x-www-form-urlencoded"
      //},
      success: function (res) {
        var list = new Array();
        console.log(res.data)
        list = res.data;
        //console.log(list[0].content);
        var str1 = list[0].content;
        
        str1 = str1.replace(/\s\s+/g, "<br />");
        //str1 = str1.replace(/&nbsp;+/g, "<br />");
        var article = `< !DOCTYPE HTML ><!--注释: wxParse试验文本-->
            <div style="background-color: #fff;color: black;display: block;width: 700rpx;margin: 0 auto;
padding: 20rpx 0;font-size: 32rpx;">`+ str1 + `</div>`;
        WxParse.wxParse('article', 'html', article, that, 5);
        //console.log(str1);
        var str2 = list[0].provider;
        var str3 = list[0].news_time;
        str3 = str3.split(" ")[0]
        var str4 = list[0].subject;
        str4 = str4.replace(/\s\s+/g, "\n");
        str4 = str4.replace(/&nbsp;+/g, "\n");
        that.setData({
          list: str1,
          user: str2,
          date: str3,
          subject:str4
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

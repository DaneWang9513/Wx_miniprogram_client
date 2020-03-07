// pages/xiaofei/xiaofei.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderList: [],
    yu_e: [],
    calendarConfig: {
      defaultDay: true, // 默认选中指定某天；当为 boolean 值 true 时则默认选中当天，非真值则在初始化时不自动选中日期，
      markToday: '今',
    },
    modalName: ''
    //xj_ye: wx.getStorageSync('xj_ye'),
    //bt_ye: wx.getStorageSync('bt_ye'),
  },

  helper: function (args) {
    var that = this;
    var header = {
      'content-type': 'application/json',
      'Accept': 'application/json',
      'cookie': wx.getStorageSync("sessionid")
    };
    wx.request({
      url: args.url,
      method: "POST",
      header: header,
      data: args.data,
      success(res) {
        var cookie = res.header["Set-Cookie"];
        if (cookie != null) {
          wx.setStorageSync("sessionid", res.header["Set-Cookie"]);
        }
        if (args.success) args.success(res);
      },
      complete(res) {
        if (args.complete) args.complete(res);
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
    /** 
    var that = this;
    var username = getApp().globalData.username;
    //var path = getApp().globalData.urlpath + '/media/';
    that.helper({
      url: getApp().globalData.urlpath + '/getXiaofei',
      data: {
        username: username,
      },
      success: function (res) {
        that.setData({
          orderList: res.data,
          //path: path
        })
        that.helper({
          url: getApp().globalData.urlpath + '/getYue',
          data: {
            username: username,
          },
          success: function (res) {
            //wx.setStorage({//存储到本地
              //key: "xj_ye",
              //data: res.data[0].New_card_cash
            //});
            //wx.setStorage({//存储到本地
              //key: "bt_ye",
              //data: res.data[0].New_card_subsidy
            //});
            that.setData({
              yu_e: res.data,
              //path: path
            })
            
            console.log(res.data)
          }
        })
        console.log(res.data)
      }
    })
    */

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

  },
  /**
   * 选择日期后执行的事件
   * currentSelect 当前点击的日期
   * allSelectedDays 选择的所有日期（当mulit为true时，allSelectedDays有值）
   */
  afterTapDay(e) {
    console.log('afterTapDay', e.detail); // => { currentSelect: {}, allSelectedDays: [] }
    console.log('afterTapDay', e.detail.year);
    this.setData({
      modalName: 'Image'
    })
    var that = this;
    var dept = getApp().globalData.dept;
    var nian = e.detail.year;
    var yue = e.detail.month;
    var ri = e.detail.day;
    if(yue<10){
      yue = "0"+yue;
    }
    if(ri<10){
      ri = "0"+ri;
    }     
    var nian_yue = nian+'-'+yue+'-'+ri;
    console.log(nian_yue)
    //var path = getApp().globalData.urlpath + '/media/';
    that.helper({
      url: getApp().globalData.urlpath + '/tongjiOrder',
      data: {
        dept: dept,
        nian_yue: nian_yue
      },
      success: function (res) {
        that.setData({
          orderList: res.data,
          //path: path
        })
        that.helper({
          url: getApp().globalData.urlpath + '/countOrder',
          data: {
            dept: dept,
            nian_yue: nian_yue
          },
          success: function (res) {
            //wx.setStorage({//存储到本地
              //key: "xj_ye",
              //data: res.data[0].New_card_cash
            //});
            //wx.setStorage({//存储到本地
              //key: "bt_ye",
              //data: res.data[0].New_card_subsidy
            //});
            that.setData({
              yu_e: res.data,
              modalName: ''
              //path: path
            })
            

            console.log(res.data)
          }
        })
        console.log(res.data)
      }
    })
  },
  /**
   * 当日历滑动时触发(适用于周/月视图)
   * 可在滑动时按需在该方法内获取当前日历的一些数据
   */
  onSwipe(e) {
    console.log('onSwipe', e.detail);
    const dates = this.calendar.getCalendarDates();
  },
  /**
   * 当改变月份时触发
   * => current 当前年月 / next 切换后的年月
   */
  whenChangeMonth(e) {
    console.log('whenChangeMonth', e.detail);
    // => { current: { month: 3, ... }, next: { month: 4, ... }}
  },
  /**
   * 周视图下当改变周时触发
   * => current 当前周信息 / next 切换后周信息
   */
  whenChangeWeek(e) {
    console.log('whenChangeWeek', e.detail);
    // {
    //    current: { currentYM: {year: 2019, month: 1 }, dates: [{}] },
    //    next: { currentYM: {year: 2019, month: 1}, dates: [{}] },
    //    directionType: 'next_week'
    // }
  },
  /**
   * 日期点击事件（此事件会完全接管点击事件），需自定义配置 takeoverTap 值为真才能生效
   * currentSelect 当前点击的日期
   */
  onTapDay(e) {
    console.log('onTapDay', e.detail); // => { year: 2019, month: 12, day: 3, ...}
  },
  /**
   * 日历初次渲染完成后触发事件，如设置事件标记
   */
  afterCalendarRender(e) {
    console.log('afterCalendarRender', e);
    this.setData({
      modalName: 'Image'
    })
    var that = this;
    var dept = getApp().globalData.dept;
    var now = new Date();
    var year = now.getFullYear(); //得到年份
    var month = now.getMonth();//得到月份
    var date = now.getDate();//得到日期
    month = month + 1;
    if (month < 10) month = "0" + month;
    if (date < 10) date = "0" + date;
    var nian_yue = year+'-'+month+'-'+date;
    console.log(nian_yue)
    //var path = getApp().globalData.urlpath + '/media/';
    that.helper({
      url: getApp().globalData.urlpath + '/tongjiOrder',
      data: {
        dept: dept,
        nian_yue: nian_yue
      },
      success: function (res) {
        that.setData({
          orderList: res.data,
          //path: path
        })
        that.helper({
          url: getApp().globalData.urlpath + '/countOrder',
          data: {
            dept: dept,
            nian_yue: nian_yue
          },
          success: function (res) {
            //wx.setStorage({//存储到本地
              //key: "xj_ye",
              //data: res.data[0].New_card_cash
            //});
            //wx.setStorage({//存储到本地
              //key: "bt_ye",
              //data: res.data[0].New_card_subsidy
            //});
            that.setData({
              yu_e: res.data,
              modalName: ''
              //path: path
            })
            

            console.log(res.data)
          }
        })
        console.log(res.data)
      }
    })
  }
  
})
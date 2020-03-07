// pages/ini/ini.js
var util = require('../../utils/util.js');  
var status = true;
var inputTopic = "";
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    test:"",
    logs: [],
    topic: "",
    inputTopic: "a",
    inputActivity:"",
    inputTime:"00:00",
    time:"",
    stime:"",
    endtime:"",
    show: "",
    show1:"",
    show2:"?",
    src:"",
    status: status,
    tempFilePaths: 'https://wxdc.bsrse.com:10003/',
    imgwidth: 0,
    imgheight: 0,
    temp: app.globalData.inner,
    formID:"",
    formerID:"",
    num: app.globalData.username,
    name: app.globalData.first_name,
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
    //this.getdata();
    //setData({
    //  temp : app.globalData.inner
    //})
    //app.global.Data.inner = inputTopic
    var stime = util.formatTime(new Date());  
    this.setData({
      stime: stime
    });
    console.log(stime);
  },

  bindTimeChange: function (e) {
    this.endtime = e.detail.value;
    var stime = util.formatTime(new Date());
    var stime_date = stime.split(" ")[0];
    console.log(stime_date)
    this.setData({
      inputTime: e.detail.value,
      endtime: stime_date+" "+e.detail.value+":00",
    })
    //console.log(this.endtime);
    //console.log(e.detail.value);
  },
  bindInput_1: function(e) {
    this.inputTopic = e.detail.value;
    this.setData({
      inputTopic: e.detail.value,
    })
  },
  bindInput_2: function (e) {
    this.inputActivity = e.detail.value;
    this.setData({
      inputActivity: e.detail.value
    })
  },
  formSubmit: function(e) {
    if (e.detail.value.topic.length==0&&e.detail.value.endtime.length==0) {
      wx.showToast({
        title: '签到主题和结束时间不能为空',
        icon: 'none',
        duration: 2000
      })
    }
    else if(e.detail.value.topic.length==0) {
      wx.showToast({
        title: '签到主题不能为空',
        icon: 'none',
        duration: 2000
      })   
    }
    else if (e.detail.value.endtime.length == 0) {
      wx.showToast({
        title: '结束时间不能为空',
        icon: 'none',
        duration: 2000
      })
    }
    else {
      var that = this;
      var a = "https://wxdc.bsrse.com:10003/";
      var t1 = e.detail.value.topic + e.detail.value.endtime;
      var t2 = a + t1 + "*" + e.detail.value.topic;
      this.tempFilePaths = t2;
      this.formID = t1;
      this.setData({
        tempFilePaths: t2,
        formID: t1,
      });
      app.globalData.inner = e.detail.value.topic;
      app.globalData.url = this.tempFilePaths;
      console.log(app.globalData.url);
      console.log(app.globalData.inner);
      console.log(that.tempFilePaths);

      console.log(this.formID);
      console.log(this.endtime);


      //提交数据
      
      wx.request({
        //url:"https://wxdc.bsrse.com:10003/launchsignin.php",
        url: getApp().globalData.urlpath +"/commitSignin",

        data:{
          topic:this.data.inputTopic,
          startTime:this.data.stime,
          endTime:this.data.endtime,
          content:this.data.inputActivity,
          FormerID: app.globalData.username + app.globalData.first_name,//学号和姓名标识一个用户
          FormID: e.detail.value.topic + e.detail.value.endtime,//话题和时间标识一次发起签到
        },

        method:"POST",

        //header:{
          //"Content-type":"application/x-www-form-urlencoded"
        //},

        success:function(res) {
            console.log("返回值："+res.data);
            console.log("succ");
            if(res.data=='True'){
              wx.navigateTo({
                url: 'next'
              })
            }else{
              wx.showToast({
                title: '所输内容违法',
                icon: 'none',
                duration: 2000
              })
            }
            
        },
        fail:function(res) {
          //console.log(this.record);
          console.log(res.data);
          console.log("failed");
        }
      });

       
    }

    //wx.navigateTo({
    //  url: 'next'
    //}) 
  },

  toastHide: function (event) {
    status = true
    this.setData({ status: status })
  },

})
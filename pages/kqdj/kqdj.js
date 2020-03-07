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
    test: "",
    logs: [],
    topic: "",
    inputTopic: "a",
    inputActivity: "",
    inputTime: "选择日期",
    inputTime1:"选择时间",
    inputTime2: "选择日期",
    inputTime3: "选择时间",
    time: "",
    stime: "",
    endtime: "",
    show: "",
    show1: "",
    show2: "?",
    src: "",
    status: status,
    tempFilePaths: 'https://wxdc.bsrse.com:10003/',
    imgwidth: 0,
    imgheight: 0,
    temp: app.globalData.inner,
    formID: "",
    formerID: "",
    num: app.globalData.username,
    name: app.globalData.first_name,
    pic_array: [
      { id: 1, name: '请选择' },
      { id: 2, name: '加班' },
      { id: 3, name: '公假' },
    ],
    hx_index: 0,
  },

  bindPickerChange_hx: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value);
    this.setData({   //给变量赋值
      hx_index: e.detail.value,  //每次选择了下拉列表的内容同时修改下标然后修改显示的内容，显示的内容和选择的内容一致
    })
    console.log('自定义值:', this.data.hx_select);
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
      endtime: stime_date + " " + e.detail.value + ":00",
    })
    //console.log(this.endtime);
    console.log(e.detail.value);
  },
  bindTimeChange1: function (e) {
    this.endtime = e.detail.value;
    var stime = util.formatTime(new Date());
    var stime_date = stime.split(" ")[0];
    console.log(stime_date)
    this.setData({
      inputTime1: e.detail.value,
      endtime: stime_date + " " + e.detail.value + ":00",
    })
    //console.log(this.endtime);
    console.log(e.detail.value);
  },
  bindTimeChange2: function (e) {
    this.endtime = e.detail.value;
    var stime = util.formatTime(new Date());
    var stime_date = stime.split(" ")[0];
    console.log(stime_date)
    this.setData({
      inputTime2: e.detail.value,
      endtime: stime_date + " " + e.detail.value + ":00",
    })
    //console.log(this.endtime);
    console.log(e.detail.value);
  },
  bindTimeChange3: function (e) {
    this.endtime = e.detail.value;
    var stime = util.formatTime(new Date());
    var stime_date = stime.split(" ")[0];
    console.log(stime_date)
    this.setData({
      inputTime3: e.detail.value,
      endtime: stime_date + " " + e.detail.value + ":00",
    })
    //console.log(this.endtime);
    console.log(e.detail.value);
  },
  bindInput_1: function (e) {
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
  formSubmit: function (e) {
    if (e.detail.value.hx_index == 0 && e.detail.value.inputTime.length == 0 && e.detail.value.inputTime1.length == 0 && e.detail.value.inputTime2.length == 0 && e.detail.value.inputTime3.length == 0) {
      wx.showToast({
        title: '考勤类型和所有日期时间不能为空',
        icon: 'none',
        duration: 2000
      })
    }
    else if (e.detail.value.picker_hx == 0) {
      wx.showToast({
        title: '考勤类型不能为空',
        icon: 'none',
        duration: 2000
      })
    }
    else if (e.detail.value.inputTime == "选择日期" || e.detail.value.inputTime1 == "选择日期" || e.detail.value.inputTime2 == "选择日期" || e.detail.value.inputTime3 == "选择日期") {
      wx.showToast({
        title: '日期时间不能为空',
        icon: 'none',
        duration: 2000
      })
    }
    else if (e.detail.value.topic.length == 0) {
      wx.showToast({
        title: '计时不能为空',
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
        url: getApp().globalData.urlpath +"/createKaoqin",

        data: {
          topic: this.data.inputTopic,//计时
          startTime: this.data.inputTime+" "+this.data.inputTime1+":00",
          endTime: this.data.inputTime2 + " " + this.data.inputTime3 + ":00",
          content: this.data.inputActivity,//缘由
          kq_type:this.data.hx_index,
          user_name:app.globalData.first_name,
          oa_id:app.globalData.oa_id,
          dept_id:app.globalData.dept_id,
        },

        method: "POST",

        //header:{
        //"Content-type":"application/x-www-form-urlencoded"
        //},

        success: function (res) {
          console.log("返回值：" + res.data);
          console.log("succ");
          if (res.data == 'True') {
            wx.showToast({
              title: '提交成功',
              icon: 'none',
              duration: 2000
            })
          } else {
            wx.showToast({
              title: '所输内容有误，请检查',
              icon: 'none',
              duration: 2000
            })
          }

        },
        fail: function (res) {
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
// pages/gzcx/gzcx.js
var wxCharts = require('../../utils/wxcharts.js');
var app = getApp();
var lineChart = null;
var pieChart = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    gongzi:[],
    modalName:'',
    inputTime: "选择年月",
    select_time:''
  },

  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },

  touchHandler: function (e) {
    console.log(lineChart.getCurrentDataIndex(e));
    lineChart.showToolTip(e, {
        // background: '#7cb5ec',
        format: function (item, category) {
            return category + ' ' + item.name + ':' + item.data 
        }
    });
  },    
  createSimulationData: function () {
      var categories = [];
      for (var i = 0; i < 12; i++) {
          categories.push('2020-' + (i + 1));
          //data.push(Math.random()*(20-10)+10);
      }
      return {
          categories: categories
      }
  },

  touchHandler: function (e) {
    console.log(pieChart.getCurrentDataIndex(e));
  },

  bindTimeChange: function (e) {
    var that = this;
    console.log(e.detail.value);
    //this.endtime = e.detail.value;
    var username = getApp().globalData.username;
    var stime = e.detail.value;
    var nian = stime.split("-")[0];
    var yue = stime.split("-")[1];
    var nianyue = nian+yue;
    console.log(nianyue)
    this.setData({
      inputTime: e.detail.value,
      select_time: nianyue,
    })
    that.setData({
      modalName: 'Image'
    })
    wx.request({
      url: getApp().globalData.urlpath +"/gSalary",
      data: {
        periodtime:nianyue,
        userno:username,
        authen: "JXU0RUFDJXU4RjY2JXU1REU1JXU4RDQ0JXU2M0E1JXU1M0Uz",
      },
      method: "GET",
      success: function (res) {
        console.log(res.data)
        that.setData({
          gongzi: res.data,
          
        });
        wx.request({
          url: getApp().globalData.urlpath +"/tj_Salary",
          data: {
            periodtime:nianyue,
            userno:username,
            authen: "JXU0RUFDJXU4RjY2JXU1REU1JXU4RDQ0JXU2M0E1JXU1M0Uz",
          },
          method: "GET",
          success: function (res) {
            console.log(res.data);
            var tj = res.data;
            var gwjb = tj[0].gwjb;
            gwjb = parseFloat(gwjb);
            var gwxy = tj[0].gwxy;
            gwxy = parseFloat(gwxy);
            var glgz = tj[0].glgz;
            glgz = parseFloat(glgz);
            var jnjt = tj[0].jnjt;
            jnjt = parseFloat(jnjt);
            var wcf = tj[0].wcf;
            wcf = parseFloat(wcf);
            var zftzbt = tj[0].zftzbt;
            zftzbt = parseFloat(zftzbt);
            var prjbf = tj[0].prjbf;
            prjbf = parseFloat(prjbf);
            var jrjbf = tj[0].jrjbf;
            jrjbf = parseFloat(jrjbf);
            var ylbx = tj[0].ylbx;
            ylbx = parseFloat(ylbx);
            var ylibx = tj[0].ylibx;
            ylibx = parseFloat(ylibx);
            var ylde = tj[0].ylde;
            ylde = parseFloat(ylde);
            var sybx = tj[0].sybx;
            sybx = parseFloat(sybx);
            var zfgjj = tj[0].zfgjj;
            zfgjj = parseFloat(zfgjj);
            var nj = tj[0].nj;
            nj = parseFloat(nj);
            var fz = tj[0].fz;
            fz = parseFloat(fz);
            var hf = tj[0].hf;
            hf = parseFloat(hf);
            var yjse = tj[0].yjse;
            yjse = parseFloat(yjse);
            var windowWidth = 320;
            try {
                var res = wx.getSystemInfoSync();
                windowWidth = res.windowWidth;
            } catch (e) {
                console.error('getSystemInfoSync failed!');
            }
            pieChart = new wxCharts({
              animation: true,
              canvasId: 'pieCanvas',
              type: 'pie',
              series: [{
                  name: '岗位基本',
                  data: gwjb,
              }, {
                  name: '岗位效益',
                  data: gwxy,
              }, {
                  name: '工龄工资',
                  data: glgz,
              }, {
                  name: '技能津贴',
                  data: jnjt,
              }, {
                  name: '误餐费',
                  data: wcf,
              }, {
                  name: '住房提租补贴',
                  data: zftzbt,
              }, {
                  name: '平日加班费',
                  data: prjbf,
              }, {
                  name: '节假日加班费',
                  data: jrjbf,
              },{
                  name: '养老保险',
                  data: ylbx,
              }, {
                  name: '医疗保险',
                  data: ylibx,
              }, {
                  name: '医疗大额',
                  data: ylde,
              }, {
                  name: '失业保险',
                  data: sybx,
              }, {
                  name: '住房公积金',
                  data: zfgjj,
              }, {
                  name: '年金',
                  data: nj,
              }, {
                  name: '房租',
                  data: fz,
              }, {
                  name: '会费',
                  data: hf,
              }, {
                  name: '预缴税额',
                  data: yjse,
              }],
              width: windowWidth,
              height: 300,
              dataLabel: true,
            });
              that.setData({
                modalName:'',
              });
          }
        });
      }
    })
    //console.log(this.endtime);
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var username = getApp().globalData.username;
    var timestamp = Date.parse(new Date());
    var date = new Date(timestamp);
    //获取年份  
    var Y =date.getFullYear();
    //获取月份  
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    var periodtime = Y+M
    console.log(periodtime)
    that.setData({
      modalName: 'Image'
    })
    wx.request({
      url: getApp().globalData.urlpath +"/gSalary",
      data: {
        periodtime:periodtime,
        userno:username,
        authen: "JXU0RUFDJXU4RjY2JXU1REU1JXU4RDQ0JXU2M0E1JXU1M0Uz",
      },
      method: "GET",
      success: function (res) {
        console.log(res.data)
        that.setData({
          gongzi: res.data,
        });
        wx.request({
          url: getApp().globalData.urlpath +"/ymlSalary",
          data: {
            userno:username,
            authen: "JXU0RUFDJXU4RjY2JXU1REU1JXU4RDQ0JXU2M0E1JXU1M0Uz",
          },
          method: "GET",
          success: function (res) {
            console.log(res.data)
            var data = res.data[0];
            var data_y = [];
            for (var i = 0; i < data.length; i++) {
              //categories.push('2020-' + (i + 1));
              //data.push(Math.random()*(20-10)+10);
              var str1 = data[i].replace(",","");
              data_y.push(str1);
            }
            var data1 = res.data[1];
            var data_s = [];
            for (var n = 0; n < data1.length; n++) {
              //categories.push('2020-' + (i + 1));
              //data.push(Math.random()*(20-10)+10);
              var str2 = data1[n].replace(",","");
              data_s.push(str2);
            }
            var windowWidth = 320;
            try {
                var res = wx.getSystemInfoSync();
                windowWidth = res.windowWidth;
            } catch (e) {
                console.error('getSystemInfoSync failed!');
            }
            var categories = [];
            for (var m = 0; m < 12; m++) {
                categories.push('2020-' + (m + 1));
                //data.push(Math.random()*(20-10)+10);
            }
            lineChart = new wxCharts({
                canvasId: 'lineCanvas',
                type: 'line',
                categories: categories,
                animation: true,
                background: '#f6f6f6',
                series: [{
                    name: '应发工资',
                    data: data_y,
                    format: function (val, name) {
                        return val;
                    }
                },{
                  name: '实发工资',
                  data: data_s,
                  format: function (val, name) {
                      return val;
                  }
              }],
                xAxis: {
                    disableGrid: true
                },
                yAxis: {
                    title: '金额 (元)',
                    format: function (val) {
                        return val;
                    },
                    min: 0
                },
                width: windowWidth,
                height: 200,
                dataLabel: false,
                dataPointShape: true,
                extra: {
                    lineStyle: 'curve'
                }
            });
            that.setData({
              modalName:'',
            });
            
            
          }
        });
      }
    });
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
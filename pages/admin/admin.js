// pages/admin/admin.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: wx.getStorageSync('us_name'),
    password: wx.getStorageSync('us_password'),
    openid: wx.getStorageSync('tokenId'),
    dept:'',
    showModal: true, // 显示modal弹窗
    single: false, // false 只显示一个按钮，如果想显示两个改为true即可
    modalName: 'Modal',
    f_used: wx.getStorageSync('first_used'),
    cardCur: 0,
    swiperList: [{
      id: 0,
      type: 'image',
      url: 'https://wxdc.bsrse.com/media/image/login.jpg'
    }, {
      id: 1,
        type: 'image',
        url: 'https://wxdc.bsrse.com/media/image/bg1.jpg',
    }, {
      id: 2,
      type: 'image',
      url: 'https://wxdc.bsrse.com/media/image/cf.jpg'
    }, {
      id: 3,
      type: 'image',
      url: 'https://wxdc.bsrse.com/media/image/cf2.jpg'
    }, {
      id: 4,
      type: 'image',
      url: 'https://wxdc.bsrse.com/media/image/lt.jpg'
    }],
  },

  showModal(e) {
    this.setData({
      modalName: 'Modal'
    })
  },

  hideModal(e) {
    this.setData({
      modalName: null
    })
  },

  // 获取输入账号
  usernameInput: function (e) {
    this.setData({
      username: e.detail.value
    })
    
  },

  // 获取输入密码
  passwordInput: function (e) {
    this.setData({
      password: e.detail.value
    })
  },

  login: function (args ) {
    var username = this.data.username;
    var password = this.data.password;
    var openid = wx.getStorageSync('tokenId');
    //this.data.u_name = wx.getStorageSync('u_name')
    wx.vibrateShort({
      complete: (res) => {console.log('点击振动')},
    })

    if (username.length == 0 || password.length == 0) {
      wx.showModal({
        title: '提示',
        content: '用户名和密码不能为空',
      })
    } else {
      wx.requestSubscribeMessage({
        tmplIds: ['z1SWSOiFd83jNvlGtr9-TnmvEwPiwI_jncv7WniQQVk','j2hys9G8jAbWAKp6aSxPzWwOk6tRovJrC2qaTGHcM_I','8ZMn1mftfwv6iM_451Njv4ehUxrdHABAg08LXDBWrCw'], 
        success (res) {
          console.log('已授权接收订阅消息')
        }
      })
      
      // 这里是登录验证
      this.helper({
        url: getApp().globalData.urlpath + '/weixinlogin',
        data: {
          username: username,
          password: password,
          openid: openid
        },
        success(res) {
          console.log(username,password);
          var res_str = res.data;
          if (res_str.indexOf("True")!= -1) {
            wx.setStorage({//存储到本地
              key: "us_name",
              data: username
            });
            wx.setStorage({//存储到本地
              key: "us_password",
              data: password
            });
            wx.setStorage({//存储到本地
              key: "first_used",
              data: "no"
            });
            wx.showToast({
              title: '登录成功',
              icon: 'success',
              duration: 1500
            });
            //dept = res.data;
            getApp().globalData.username = username;
            getApp().globalData.dept = res_str.split("&")[1];
            getApp().globalData.first_name = res_str.split("&")[2];
            var oa_id = res_str.split("&")[3];
            getApp().globalData.oa_id = oa_id
            getApp().globalData.dept_id = res_str.split("&")[4];
            getApp().globalData.is_mes = res_str.split("&")[5];
            getApp().globalData.is_smzc = res_str.split("&")[6];
            getApp().globalData.is_grzc = res_str.split("&")[7];
            getApp().globalData.is_bmzc = res_str.split("&")[8];
            getApp().globalData.mes_id = res_str.split("&")[9];
            getApp().globalData.mes_dept = res_str.split("&")[10];
            getApp().globalData.is_gzcx = res_str.split("&")[11];
            console.log(getApp().globalData.dept, getApp().globalData.first_name, getApp().globalData.oa_id, getApp().globalData.dept_id,getApp().globalData.is_mes,getApp().globalData.is_smzc,getApp().globalData.is_grzc,getApp().globalData.is_bmzc,getApp().globalData.mes_id,getApp().globalData.mes_dept,getApp().globalData.is_gzcx);
            //wx.switchTab({
              //url: '../shouye/shouye',
            //})
            wx.switchTab({
              url: '../shouye/shouye',
            })
            //wx.redirectTo({
              //url: '../shouye/shouye'
            //})
          } else {
            wx.showModal({
              title: '提示',
              content: '用户名或密码错误',
            })
          }
        },
        fail(res) {
          wx.showToast({
            title: '连接服务器失败',
            image: '/images/error.png',
            duration: 1500
          });
        }
      });
    }
  },

  helper: function(args) {
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
      },
      fail(res) {
        if(args.fail) args.fail(res);
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.towerSwiper('swiperList');
    // 初始化towerSwiper 传已有的数组名即可
  },

  // towerSwiper
  // 初始化towerSwiper
  towerSwiper(name) {
    let list = this.data[name];
    for (let i = 0; i < list.length; i++) {
      list[i].zIndex = parseInt(list.length / 2) + 1 - Math.abs(i - parseInt(list.length / 2))
      list[i].mLeft = i - parseInt(list.length / 2)
    }
    this.setData({
      swiperList: list
    })
  },
  // towerSwiper触摸开始
  towerStart(e) {
    this.setData({
      towerStart: e.touches[0].pageX
    })
  },
  // towerSwiper计算方向
  towerMove(e) {
    this.setData({
      direction: e.touches[0].pageX - this.data.towerStart > 0 ? 'right' : 'left'
    })
  },
  // towerSwiper计算滚动
  towerEnd(e) {
    let direction = this.data.direction;
    let list = this.data.swiperList;
    if (direction == 'right') {
      let mLeft = list[0].mLeft;
      let zIndex = list[0].zIndex;
      for (let i = 1; i < list.length; i++) {
        list[i - 1].mLeft = list[i].mLeft
        list[i - 1].zIndex = list[i].zIndex
      }
      list[list.length - 1].mLeft = mLeft;
      list[list.length - 1].zIndex = zIndex;
      this.setData({
        swiperList: list
      })
    } else {
      let mLeft = list[list.length - 1].mLeft;
      let zIndex = list[list.length - 1].zIndex;
      for (let i = list.length - 1; i > 0; i--) {
        list[i].mLeft = list[i - 1].mLeft
        list[i].zIndex = list[i - 1].zIndex
      }
      list[0].mLeft = mLeft;
      list[0].zIndex = zIndex;
      this.setData({
        swiperList: list
      })
    }
  },

  // 点击取消按钮的回调函数
  modalCancel(e) {
    // 这里面处理点击取消按钮业务逻辑
    console.log('点击了取消')
  },
  // 点击确定按钮的回调函数
  modalConfirm(e) {
   // 这里面处理点击确定按钮业务逻辑
    console.log('点击了确定')
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
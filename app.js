//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log(res.code)//这就是code
        if (res.code) {
          
          wx.request({
            url: getApp().globalData.urlpath + '/huoquid',
            method: 'GET',
            data: {
              "code": res.code
            },
            header: {
              'content-type': 'application/json'
            },
            success: function (res) {
              console.log(res);
              
              if (res.data) {
                wx.setStorage({
                  key: "tokenId",
                  data: res.data,
                })
              }
            }
          })
        }
        var username = wx.getStorageSync('us_name');
        var password = wx.getStorageSync('us_password');
        var openid = wx.getStorageSync('tokenId');
        if(username!=""&&password!=""){
          wx.request({
            url: getApp().globalData.urlpath + '/weixinlogin',
            data: {
              username: username,
              password: password,
              openid: openid
            },
            method: 'POST',
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
        // 这里是登录验证
        
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              //console.log(res.userInfo)

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    
  },
  globalData: {
    urlpath: 'http://127.0.0.1:8000',
    username: '',
    dept: '',
    first_name: '', 
    yu_e: [],
    oa_cookie:'',
    oa_id:'',
    dept_id:'',
    is_mes:'',
    is_smzc:'',
    is_grzc:'',
    is_bmzc:'',
    mes_id:'',
    mes_dept:'',
    is_gzcx:''
  }
})
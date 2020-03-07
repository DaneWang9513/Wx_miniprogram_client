const typeMessageMap = {
  '0':'xw',
  '1':'gg',
  '2': 'tl'
}

Page({
  data: {
    activeIndex: -1,
    typeArray: [{
      type: '新闻',
      }, {
      type: '公告',
      }, {
        type: '讨论',
      }],

    type_sl:'xw'

    
  },
  onLoad() {
    this.getNewsList()
  },
  onPullDownRefresh(){
    this.getNewsList(() => {
      wx.stopPullDownRefresh()
    })
  },
  getNewsList(callback){
    var that = this;
    wx.request({
      //url: 'https://wxdc.bsrse.com:10003/lookup.php',
      //url: 'http://127.0.0.1/phpmyadmin/test/find.php',
      //url: 'https://danewang.goho.co/getSignin',
      url: getApp().globalData.urlpath +'/getNews',
      method: 'POST',
      data: {
        to_id: "ALL_DEPT"
      },
      //header: {
      // "Content-Type": "application/x-www-form-urlencoded"
      //},
      success: function (res) {
        console.log(res.data)
        var list = new Array();
        list = res.data;
        for (var i = 0; i < list.length; i++) {
          list[i].txtStyle = "";
          list[i].txt = list[i].subject;
          list[i].jianjie = list[i].content.replace(/&nbsp;/ig, "");
          list[i].key = list[i].keyword;
        }
        //更新列表
        that.setData({
          list: list
        });
      }
      /*
      success: function (res) {
        console.log(res.data)
        that.setData({arr : res.data.split(" ")});
        var list = new Array();
        for (var i = 0; i < that.data.arr.length - 4; i = i + 4) {
          var ob = {
            txtStyle : "",
            IfEnd: that.data.arr[i],

            txt: that.data.arr[i + 1],

            state: that.data.arr[i + 2],

            FormID : that.data.arr[i+3]

          };
          list.push(ob);
          that.setData({
            list: list
          });
        }
  },*/

    })
  },
  GetDetialMessage: function (e) {
    var index = e.target.dataset.index;
    var list = this.data.list;
    //将FormID传递到跳转页面
    var key = list[index].id;
    console.log(key)
    if (this.data.turn_to_detial == true&&this.data.type_sl=="xw") {
      wx.navigateTo({
        url: "../new_detail/new_detail?detail=" + key

      })
    }else if(this.data.turn_to_detial == true&&this.data.type_sl=="gg") {
      wx.navigateTo({
        url: "../notify_detail/notify_detail?detail=" + key

      })
    }else if(this.data.turn_to_detial == true&&this.data.type_sl=="tl") {
      wx.navigateTo({
        url: "../taolun_detail/taolun_detail?detail=" + key

      })
    }
    this.data.turn_to_detial = true
  },

  getNotifyList(callback){
    var that = this;
    wx.request({
      //url: 'https://wxdc.bsrse.com:10003/lookup.php',
      //url: 'http://127.0.0.1/phpmyadmin/test/find.php',
      //url: 'https://danewang.goho.co/getSignin',
      url: getApp().globalData.urlpath +'/getNotifys',
      method: 'POST',
      data: {
        to_id: "ALL_DEPT"
      },
      //header: {
      // "Content-Type": "application/x-www-form-urlencoded"
      //},
      success: function (res) {
        console.log(res.data)
        var list = new Array();
        list = res.data;
        for (var i = 0; i < list.length; i++) {
          list[i].txtStyle = "";
          list[i].txt = list[i].subject;
          list[i].jianjie = list[i].content.replace(/&nbsp;/ig, "");
          list[i].key = list[i].keyword;
        }
        //更新列表
        that.setData({
          list: list
        });
      }
      /*
      success: function (res) {
        console.log(res.data)
        that.setData({arr : res.data.split(" ")});
        var list = new Array();
        for (var i = 0; i < that.data.arr.length - 4; i = i + 4) {
          var ob = {
            txtStyle : "",
            IfEnd: that.data.arr[i],

            txt: that.data.arr[i + 1],

            state: that.data.arr[i + 2],

            FormID : that.data.arr[i+3]

          };
          list.push(ob);
          that.setData({
            list: list
          });
        }
  },*/

    })
  },

  getTaolunList(callback){
    var that = this;
    wx.request({
      //url: 'https://wxdc.bsrse.com:10003/lookup.php',
      //url: 'http://127.0.0.1/phpmyadmin/test/find.php',
      //url: 'https://danewang.goho.co/getSignin',
      url: getApp().globalData.urlpath +'/getTaolun',
      method: 'POST',
      data: {
        to_id: "ALL_DEPT"
      },
      //header: {
      // "Content-Type": "application/x-www-form-urlencoded"
      //},
      success: function (res) {
        console.log(res.data)
        var list = new Array();
        list = res.data;
        for (var i = 0; i < list.length; i++) {
          list[i].txtStyle = "";
          list[i].txt = list[i].subject;
          list[i].jianjie = "点击查看详情内容";
        }
        //更新列表
        that.setData({
          list: list
        });
      }
      /*
      success: function (res) {
        console.log(res.data)
        that.setData({arr : res.data.split(" ")});
        var list = new Array();
        for (var i = 0; i < that.data.arr.length - 4; i = i + 4) {
          var ob = {
            txtStyle : "",
            IfEnd: that.data.arr[i],

            txt: that.data.arr[i + 1],

            state: that.data.arr[i + 2],

            FormID : that.data.arr[i+3]

          };
          list.push(ob);
          that.setData({
            list: list
          });
        }
  },*/

    })
  },

  GetDetialMessage_Notify: function (e) {
    var index = e.target.dataset.index;
    var list = this.data.list;
    //将FormID传递到跳转页面
    var key = list[index].id;
    console.log(key)
    if (this.data.turn_to_detial == true) {
      wx.navigateTo({
        url: "../notify_detail/notify_detail?detail=" + key

      })
    }
    this.data.turn_to_detial = true
  },
  
  //根据点击的标签页，获取得到url的入参
  onTapMessage: function(e){

    let typeMessageIndex = e.currentTarget.dataset['index'];
    this.setData({
      activeIndex: typeMessageIndex
    })
    console.log(this.data.activeIndex)
    console.log(typeMessageIndex);
    this.setData({
      typeMessage: typeMessageMap[typeMessageIndex],
    }),
    console.log(this.data.typeMessage)
    this.data.type_sl = this.data.typeMessage;
    console.log(this.data.type_sl)
    if(typeMessageIndex==0){
      this.getNewsList()
    }
    if(typeMessageIndex==1){
      this.getNotifyList()
    }
    if(typeMessageIndex==2){
      this.getTaolunList()

    }
  },

  onTapMessageDetail:function(e){
    //let id = e.currentTarget.dataset['id'];
    //console.log(id);
    //wx.navigateTo({
      //url: '/pages/list/list?id=' + id,
    //})
  },
  
})
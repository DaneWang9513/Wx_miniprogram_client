//index.js
//获取应用实例
var app = getApp()
var arr_name = ["食堂订餐","考勤","扫码签到","健康上报"]//,"个人工资"]
var arr_link = [4, 5, 6, 7]//,7]
//var file = "../../pages/list/list"
Page({
  data: {
    iconList: [{
      icon: 'formfill',
      color: 'red',
      badge: 120,
      name: '今日菜谱',
      tap:'caipu',
      id:'caipu'
    }, {
      icon: 'circlefill',
      color: 'orange',
      badge: 1,
      name: '预订菜单',
      tap:'caidan',
      id:'caidan'
    }, {
      icon: 'goodsnewfill',
      color: 'yellow',
      badge: 0,
      name: '订单管理',
      tap:'dingdan',
      id:'dingdan'
    }, {
      icon: 'rechargefill',
      color: 'olive',
      badge: 22,
      name: '消费充值记录',
      tap:'xfcz',
      id:'xfcz'
    }, {
      icon: 'group_fill',
      color: 'cyan',
      badge: 0,
      name: '部门报餐统计',
      tap:'ddbm',
      id:'ddbm'
    }],
    iconList1: [{
      icon: 'peoplefill',
      color: 'blue',
      badge: 120,
      name: '考勤记录',
      tap:'kqjl',
      id:'kqjl'
    }, {
      icon: 'writefill',
      color: 'purple',
      badge: 1,
      name: '考勤登记',
      tap:'kqdj',
      id:'kqdj'
    }],
    iconList2: [{
      icon: 'scan',
      color: 'mauve',
      badge: 120,
      name: '资产扫码',
      tap:'smzc',
      id:'smzc',
      is_show:''
    },{
      icon: 'paintfill',
      color: 'yellow',
      badge: 120,
      name: '个人资产',
      tap:'grzc',
      id:'grzc',
      is_show:''
    },
    {
      icon: 'friendfill',
      color: 'green',
      badge: 120,
      name: '部门资产',
      tap:'bmzc',
      id:'bmzc',
      is_show:''
    }
  ],
    iconList3: [{
      icon: 'roundaddfill',
      color: 'pink',
      badge: 120,
      name: '发起活动',
      tap:'fqqd',
      id:'fqqd'
    }, {
      icon: 'barcode',
      color: 'brown',
      badge: 1,
      name: '扫码签到',
      tap:'smqd',
      id:'smqd'
    }, {
      icon: 'peoplelist',
      color: 'red',
      badge: 0,
      name: '已发起',
      tap:'yfq',
      id:'yfq'
    }, {
      icon: 'attentionfill',
      color: 'orange',
      badge: 22,
      name: '已签到',
      tap:'yqd',
      id:'yqd'
    }],
    iconList4: [{
      icon: 'card',
      color: 'red',
      badge: 120,
      name: '工资查询',
      tap:'gzcx',
      id:'gzcx',
      is_show:''
    }],
    gridCol:3,
    items: [{
      id: "4",
      src: "../../res/img/jiankangyangsheng.png",
      text: arr_name[0],
      href:"../dc_index/dc_index"
      
    }, {
        id: "5",
        src: "../../res/img/renqun.png",
        text: arr_name[1],
        href:"../kq_index/kq_index"
      }, {
        id: "6",
        src: "../../res/img/smqd.png",
        text: arr_name[2],
        href: "../qd_index/qd_index"
      }, {
        id: "7",
        src: "../../res/img/yqsb.png",
        text: arr_name[3],
        href: "../yqsb/yqsb"
      }//, {
        //id: "7",
        //src: "../../res/img/gz.png",
        //text: arr_name[6],
        //href: "../chart/chart"
      //}
    ],
    TabCur: 1,
    scrollLeft: 0,
    touchx:'',
    touchy:'',
    is_mes:'',
    is_smzc:'',
    is_grzc:'',
    is_bmzc:'',
    is_gzcx:''
    //url: file,
  },
  
  caipu: function (args ) {
    wx.requestSubscribeMessage({
      tmplIds: ['R8rv1m57rYJppr2-bU1chwGA4FNNW8MuOqTuENSDNtw'], 
      success (res) {
        console.log('已授权接收订阅消息')
      }
    })
    wx.vibrateShort({
      complete: (res) => {console.log('点击振动')},
    })
    wx.navigateTo({
      url: '../home/home'
    })
  },
  caidan: function (args ) {
    wx.requestSubscribeMessage({
      tmplIds: ['j2hys9G8jAbWAKp6aSxPzWwOk6tRovJrC2qaTGHcM_I','8ZMn1mftfwv6iM_451Njv4ehUxrdHABAg08LXDBWrCw','z1SWSOiFd83jNvlGtr9-TnmvEwPiwI_jncv7WniQQVk'], 
      success (res) {
        console.log('已授权接收订阅消息')
      }
    })
    wx.vibrateShort({
      complete: (res) => {console.log('点击振动')},
    })
    wx.navigateTo({
      url: '../caidan/caidan'
    })
  },
  dingdan:function(args){
    wx.vibrateShort({
      complete: (res) => {console.log('点击振动')},
    })
    wx.navigateTo({
      url: '../order/order'
    })

  },
  xfcz: function (args ) {
    wx.requestSubscribeMessage({
      tmplIds: ['j2hys9G8jAbWAKp6aSxPzWwOk6tRovJrC2qaTGHcM_I','8ZMn1mftfwv6iM_451Njv4ehUxrdHABAg08LXDBWrCw','z1SWSOiFd83jNvlGtr9-TnmvEwPiwI_jncv7WniQQVk'], 
      success (res) {
        console.log('已授权接收订阅消息')
      }
    })
    wx.vibrateShort({
      complete: (res) => {console.log('点击振动')},
    })
    wx.navigateTo({
      url: '../xiaofei/xiaofei'
    })
  },
  ddbm: function (args ) {
    wx.requestSubscribeMessage({
      tmplIds: ['j2hys9G8jAbWAKp6aSxPzWwOk6tRovJrC2qaTGHcM_I','8ZMn1mftfwv6iM_451Njv4ehUxrdHABAg08LXDBWrCw','z1SWSOiFd83jNvlGtr9-TnmvEwPiwI_jncv7WniQQVk'], 
      success (res) {
        console.log('已授权接收订阅消息')
      }
    })
    wx.vibrateShort({
      complete: (res) => {console.log('点击振动')},
    })
    wx.navigateTo({
      url: '../dd_bm/dd_bm'
    })
  },
  kqjl: function (args ) {
    wx.requestSubscribeMessage({
      tmplIds: ['z1SWSOiFd83jNvlGtr9-TnmvEwPiwI_jncv7WniQQVk','j2hys9G8jAbWAKp6aSxPzWwOk6tRovJrC2qaTGHcM_I','8ZMn1mftfwv6iM_451Njv4ehUxrdHABAg08LXDBWrCw'], 
      success (res) {
        console.log('已授权接收订阅消息')
      }
    })
    wx.vibrateShort({
      complete: (res) => {console.log('点击振动')},
    })
    wx.navigateTo({
      url: '../kqjl/kqjl'
    })
  },
  kqdj:function(args){
    wx.vibrateShort({
      complete: (res) => {console.log('点击振动')},
    })
    wx.navigateTo({
      url: '../kqdj/kqdj'
    })

  },
  fqqd:function(args){
    wx.vibrateShort({
      complete: (res) => {console.log('点击振动')},
    })
    wx.navigateTo({
      url: '../fqqd/ini'
    })

  },
  smqd:function(args){
    wx.vibrateShort({
      complete: (res) => {console.log('点击振动')},
    })
    wx.navigateTo({
      url: '../fqqd/shouye'
    })

  },
  yfq:function(args){
    wx.vibrateShort({
      complete: (res) => {console.log('点击振动')},
    })
    wx.navigateTo({
      url: '../Message_1Form/Message_1Form'
    })

  },
  yqd:function(args){
    wx.vibrateShort({
      complete: (res) => {console.log('点击振动')},
    })
    wx.navigateTo({
      url: '../Message_2Form/Message_2Form'
    })

  },
  smzc:function(args){
    wx.vibrateShort({
      complete: (res) => {console.log('点击振动')},
    })
    wx.navigateTo({
      url: '../mes/mes'
    })

  },
  grzc:function(args){
    wx.vibrateShort({
      complete: (res) => {console.log('点击振动')},
    })
    wx.navigateTo({
      url: '../geren_zc/geren_zc'
    })

  },
  bmzc:function(args){
    wx.vibrateShort({
      complete: (res) => {console.log('点击振动')},
    })
    wx.navigateTo({
      url: '../bumen_zc/bumen_zc'
    })

  },
  gzcx:function(args){
    wx.vibrateShort({
      complete: (res) => {console.log('点击振动')},
    })
    wx.navigateTo({
      url: '../gzcx/gzcx'
    })

  },
  kf:function(args){
    wx.vibrateShort({
      complete: (res) => {console.log('点击振动')},
    })

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
  tabSelect(e) {
    console.log(e);
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
  },
  adddetial_jrcp: function(){
    wx.navigateTo({
      url: "../home/home"
    })
  },
  adddetial_ydcd: function(){
    wx.navigateTo({
      url: "../caidan/caidan"
    })
  },
  adddetial_ddgl: function(){
    wx.navigateTo({
      url: "../order/order"
    })
  },
  adddetial_xfcz: function(){
    wx.navigateTo({
      url: "../xiaofei/xiaofei"
    })
  },
  adddetial_bmtj: function(){
    wx.navigateTo({
      url: "../dd_bm/dd_bm"
    })
  },
  adddetial_kqjl: function(){
    wx.navigateTo({
      url: "../kqjl/kqjl"
    })
  },
  adddetial_kqdj: function(){
    wx.navigateTo({
      url: "../kqdj/kqdj"
    })
  },
  adddetial_fqhd: function(){
    wx.navigateTo({
      url: "../fqqd/ini"
    })
  },
  adddetial_smqd: function(){
    wx.navigateTo({
      url: "../fqqd/shouye"
    })
  },
  adddetial_yfq: function(){
    wx.navigateTo({
      url: "../Message_1Form/Message_1Form"
    })
  },
  adddetial_yqd: function(){
    wx.navigateTo({
      url: "../Message_2Form/Message_2Form"
    })
  },
  adddetial_smzc: function(){
    wx.navigateTo({
      url: "../mes/mes"
    })
  },
  adddetial_grzc: function(){
    wx.navigateTo({
      url: "../geren_zc/geren_zc"
    })
  },
  adddetial_bmzc: function(){
    wx.navigateTo({
      url: "../bumen_zc/bumen_zc"
    })
  },
  adddetial_gzcx: function(){
    wx.navigateTo({
      url: "../gzcx/gzcx"
    })
  },
  touchStart(e) {
    // console.log(e)
    this.setData({
      touchx: e.changedTouches[0].clientX,
      touchy: e.changedTouches[0].clientY
    });
  },
  touchEnd(e) {
    let x = e.changedTouches[0].clientX;
    let y = e.changedTouches[0].clientY;
    var touchx = this.data.touchx;
    var touchy = this.data.touchy;
    var utils=require('../../utils/util.js');
    var tmp = utils.getTouchData(x,y,touchx,touchy)
    if(tmp=="right"){
      this.setData({
        modalName: e.currentTarget.dataset.target
      })
    }
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let is_mes = getApp().globalData.is_mes
    let is_smzc = getApp().globalData.is_smzc
    let is_grzc = getApp().globalData.is_grzc
    let is_bmzc = getApp().globalData.is_bmzc
    let is_gzcx = getApp().globalData.is_gzcx
    console.log(is_mes)
    this.setData({
      is_mes:is_mes,
      is_smzc:is_smzc,
      is_grzc:is_grzc,
      is_bmzc:is_bmzc,
      is_gzcx:is_gzcx
    })
    if(is_smzc==1){
      this.setData({
        'iconList2[0].is_show':'1'
      })
    }
    if(is_grzc==1){
      this.setData({
        'iconList2[1].is_show':'1'
      })
    }
    if(is_bmzc==1){
      this.setData({
        'iconList2[2].is_show':'1'
      })
    }
    if(is_gzcx==1){
      this.setData({
        'iconList4[0].is_show':'1'
      })
    }
  },
})

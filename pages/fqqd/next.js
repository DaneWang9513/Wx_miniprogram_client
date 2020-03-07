// This is our App Service.
// This is our data
// Register a Page.
var app = getApp()
Page({
  data: {
    imgalist: [app.globalData.url],
    tempFilePaths: app.globalData.url
  },
  /**   
   * 预览图片  
   */
  previewImage:function (e) {
    //var current = e.target.dataset.src;
    wx.previewImage({
      urls: this.data.tempFilePaths.split(",")
    })
  },    

  onLoad: function (option) {
    console.log(app.globalData.url)
    this.setData({
      tempFilePaths: app.globalData.url
    })
  }

})
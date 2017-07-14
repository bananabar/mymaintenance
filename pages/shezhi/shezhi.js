var app = getApp();

Page({
  data: {
    cache: [
      { iconurl: '/Image/kefu.png', title: '联系客服', tap: 'kefu' },
      { iconurl: '/Image/fankui.png', title: '意见反馈', tap: 'fankui'},
      { iconurl: '/Image/icon/wx_app_clear.png', title: '缓存清理', tap: 'clearCache' },
      { iconurl: '/Image/icon/tuichu.png', title: '退出登录', tap: 'quitCache' },
      { iconurl: '/Image/aboutme.png', title: '关于我们', tap: 'aboutme' }
    ],
    device: [
      { iconurl: '/Image/notice.png', title: '通知公告', tap: 'gonggao' },
      { iconurl: '/Image/weixiu.png', title: '接受维修单', tap: 'weixiudan' },
      { iconurl: '/Image/zhangdan.png', title: '我的维修单', tap: 'wdeweixiudan' }
     
    ],
   
    avatarUrl:'',
    userInfo:{}
  },
  onLoad: function () {
    this.setData({
      userInfo: app.globalData.userdata.Data,
      avatarUrl: app.globalData.g_userInfo.avatarUrl
    })
  },


// 退出登录
  quitCache: function () {
    wx.redirectTo({
      url: '../login/login'
    })
  },
  // 缓存清理
  clearCache: function () {
    this.showModal('缓存清理', '确定要清除本地缓存吗？', function () {
      wx.clearStorage({
        success: function (msg) {
          wx.showToast({
            title: "缓存清理成功",
            duration: 1000,
            mask: true,
            icon: "success"
          })
        },
        fail: function (e) {
          console.log(e)
        }
      })
    });
  },
  //联系客服
  kefu: function(){
    wx.navigateTo({
      url: '../custom-message/custom-message',
    })
  },
  //关于我们
  aboutme: function(){
    wx.navigateTo({
      url: 'aboutme/aboutme',
    })
  },
  
 
  //维修单
  weixiudan: function(){
    var httpsurl = app.globalData.url + "api/updateMaintenance/listbystatus"
    wx.request({
      url: httpsurl, //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json',
        token: app.globalData.userdata.Data.ObjectId
      },
      success: function (res) {
        console.log("可接维修单", res)
        app.globalData.kejieweixiudan = res.data.Data
      }
    })
    wx.navigateTo({
      url: '../jiedan/jiedan'
    });
  },
  //公告
  gonggao:function(){
    wx.navigateTo({
      url: '../notice/notice',
    })
  },
  //用户信息
  // userInfo:function(){
  //   wx.navigateTo({
  //     url: 'userinfo/userinfo',
  //   })
  // },
  //意见反馈
  fankui:function(){
    wx.navigateTo({
      url: '../fankui/fankui',
    })
  },
  //我的维修单
  wdeweixiudan:function(){
    var httpsurl = app.globalData.url + "api/updateMaintenance/listbyEngineerID"
    wx.request({
      url: httpsurl, //仅为示例，并非真实的接口地址
      data: { EngineerID: app.globalData.userdata.Data.UserId },
      header: {
        'content-type': 'application/json',
        token: app.globalData.userdata.Data.ObjectId
      },
      success: function (res) {
        console.log("维修单", res)
        app.globalData.weixiudan = res.data.Data
        httpsurl = app.globalData.url + "api/accepMaintenance/listbyEngineerID"
        wx.request({
          url: httpsurl, //仅为示例，并非真实的接口地址
          data: { EngineerID: app.globalData.userdata.Data.UserId },
          header: {
            'content-type': 'application/json',
            token: app.globalData.userdata.Data.ObjectId
          },
          success: function (res) {
            console.log("维修人员", res)
            app.globalData.weixiurenyuan = res.data.Data
            wx.navigateTo({
              url: '../weixiujilu/weixiujilu'
            });
          }
        })
      }
    })
  }


})
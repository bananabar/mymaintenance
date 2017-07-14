//index.js
//获取应用实例
var app = getApp()
var md = require('../../utils/md5.js')
var dt = require('../../utils/data.js')
Page({
  data: {
    username: "",
    password: "",
    username: "",
    code: "",
    // 滚动图
    imgUrls: [
      '../../Image/dianchang.jpg',
      '../../Image/dianchang2.jpg',
    ],
    // 工具第一行
    arr1: [
      { imgurl: '../../Image/notice.png', txt: '公告' },
      { imgurl: '../../Image/weixiu.png', txt: '接单' },
      { imgurl: '../../Image/saoyisao.png', txt: '扫一扫' },
      { imgurl: '../../Image/zhangdan.png', txt: '维修单' },
    ],

    // 公告
    noticedata: [
      { Title: "实时数据监控系统", PublishTime: "2017-03-22" },
      { Title: "app上线", PublishTime: "2017-02-22" },
      { Title: "热费管理系统上线", PublishTime: "2017-02-11" }
    ]
  },
  onLoad: function () {
    var that = this
    var httpsurl = app.globalData.url + "gonggao";
    that.setData({
      username: app.globalData.userdata.Data.UserName,
      noticedata: app.globalData.userdata.Data.noticedata,
      code: app.globalData.userdata.Data.Code,
    })
    wx.showLoading({
      mask: true,
      title: '加载中',
    })
    var httpsurl = app.globalData.url + "api/maintenanceRecord/listbyEngineerID"
    wx.request({
      url: httpsurl, //仅为示例，并非真实的接口地址
      data: { EngineerID: app.globalData.userdata.Data.UserId },
      header: {
        'content-type': 'application/json',
        token: app.globalData.userdata.Data.ObjectId
      },
      success: function (res) {
        console.log("维修记录", res)
        app.globalData.weixiujilu = res.data.Data
        httpsurl = app.globalData.url + "api/equipmentInfo/listbyUserId"
        wx.request({
          url: httpsurl, //仅为示例，并非真实的接口地址
          data: { EngineerID: app.globalData.userdata.Data.UserId },
          header: {
            'content-type': 'application/json',
            token: app.globalData.userdata.Data.ObjectId
          },
          success: function (res) {
            console.log("设备信息", res)
            app.globalData.equipment = res.data.Data
            httpsurl = app.globalData.url + "api/evaluateMaintenance/listbyEngineerID"
            wx.request({
              url: httpsurl, //仅为示例，并非真实的接口地址
              data: { EngineerID: app.globalData.userdata.Data.UserId },
              header: {
                'content-type': 'application/json',
                token: app.globalData.userdata.Data.ObjectId
              },
              success: function (res) {
                console.log("维修评价", res)
                app.globalData.weixiupingjia = res.data.Data
                setTimeout(function () {
                  wx.hideLoading()
                }, 1000)
              }
            })
          }
        })
      }
    })
  },
  onPullDownRefresh: function () {
    wx.showLoading({
      mask: true,
      title: '加载中',
    })
    var httpsurl = app.globalData.url + "api/maintenanceRecord/listbyEngineerID"
    wx.request({
      url: httpsurl,
      data: { EngineerID: app.globalData.userdata.Data.UserId },
      header: {
        'content-type': 'application/json',
        token: app.globalData.userdata.Data.ObjectId
      },
      success: function (res) {
        console.log("维修记录", res)
        app.globalData.weixiujilu = res.data.Data
        httpsurl = app.globalData.url + "api/evaluateMaintenance/listbyEngineerID"
        wx.request({
          url: httpsurl,
          data: { EngineerID: app.globalData.userdata.Data.UserId },
          header: {
            'content-type': 'application/json',
            token: app.globalData.userdata.Data.ObjectId
          },
          success: function (res) {
            console.log("维修评价", res)
            app.globalData.weixiupingjia = res.data.Data
            setTimeout(function () {
              wx.hideLoading()
            }, 1000)
            wx.stopPullDownRefresh()
          }
        })
      }
    })
  },
  kindToggle: function (e) {
    var txt = e.currentTarget.id;
    var code = this.data.code;
    var httpsurl = app.globalData.url;
    var url1 = '../detail/detail?ch=' + code.slice(2);
    switch (txt) {
      case '公告':
        wx.navigateTo({
          url: '../notice/notice'
        });
        break;
      case '接单':
        var httpsurl = app.globalData.url + "api/updateMaintenance/listbystatus"
        wx.request({
          url: httpsurl,
          header: {
            'content-type': 'application/json',
            token: app.globalData.userdata.Data.ObjectId
          },
          success: function (res) {
            console.log("可接维修单", res)
            app.globalData.kejieweixiudan = res.data.Data
            wx.navigateTo({
              url: '../jiedan/jiedan'
            });
          }
        })
        break;
      case '扫一扫':
        wx.scanCode({
          success: (res) => {
            console.log(res)
            var url = '../stationmessage/stationmessage?id=' + res.result
            console.log("navigate", url)
            wx.navigateTo({
              url: url
            });
          }
        });
        break;
      case '维修单':
        httpsurl = app.globalData.url + "api/updateMaintenance/listbyEngineerID"
        wx.request({
          url: httpsurl,
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
              url: httpsurl,
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
        break;
    }
  },
})
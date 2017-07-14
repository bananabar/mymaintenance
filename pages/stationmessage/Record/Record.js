// pages/stationmessage/Record/Record.js
var app = getApp();
var util = require('../../../utils/util.js')
Page({
  data: {
    record: []
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var that=this
    var id = options.EquipmentId
    var httpsurl = app.globalData.url + "api/maintenanceRecord/listbyequipmentid"
    wx.request({
      url: httpsurl, //仅为示例，并非真实的接口地址
      data: { EquipmentId: id },
      header: {
        'content-type': 'application/json',
        token: app.globalData.userdata.Data.ObjectId
      },
      success: function (res) {
        console.log(res)
        var data=res.data.Data
        for(var i=0;i<data.length;i++)
        {
          data[i].CreateDate = util.formatTime(data[i].CreateDate)
        }
        that.setData({
          record: data
        })
      }
    })
  },

})
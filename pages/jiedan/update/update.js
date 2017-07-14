// pages/weixiujilu/accept/accept.js
var app = getApp()
var util = require("../../../utils/util.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    updatedata1: [
      // { key: "订单编号", val: '1234567888' },
      // { key: "联系人电话", val: '水岸东方' },
      // { key: "联系人姓名", val: '13991265566' },
      // { key: "上报时间", val: '2017-05-05' },
      // { key: "订单状态", val: '未受理' },
    ],
    updatedata2: [
      // { key: "设备问题描述", val: "坏了" },
      // { key: "备注", val: "无" }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id
    this.setData({
      id: id
    })
    var that = this
    console.log(id)
    for (var i = 0; i < app.globalData.kejieweixiudan.length; i++) {
      if (id == app.globalData.kejieweixiudan[i].MaintenanceId) {
        that.setData({
          updatedata1: [
            { key: "联系人电话", val: app.globalData.kejieweixiudan[i].CientTel },
            { key: "联系人姓名", val: app.globalData.kejieweixiudan[i].Client },
            { key: "上报时间", val: util.formatTime(app.globalData.kejieweixiudan[i].CreateDate) },
            { key: "上门时间", val: app.globalData.kejieweixiudan[i].SuitTime },
            { key: "订单状态", val: "未受理" },

          ],
          updatedata2: [
            { key: "设备问题描述", val: app.globalData.kejieweixiudan[i].Question },
            { key: "备注", val: app.globalData.kejieweixiudan[i].Note }
          ]
        })
      }
    }
  },
  confirm: function () {
    var that = this
    var item = {
      MaintenanceId: that.data.id,
      CompanyId: app.globalData.userdata.Data.CompanyId,
      UserId: app.globalData.userdata.Data.UserId
    }
    console.log(item)
    var httpsurl = app.globalData.url + "api/accepMaintenance/insert";
    wx.request({
      url: httpsurl, //仅为示例，并非真实的接口地址
      method: "POST",
      data: item,
      header: {
        'content-type': 'application/json',
        token: app.globalData.userdata.Data.ObjectId
      },
      success: function (res) {
        console.log(res)
        httpsurl = app.globalData.url + "api/updateMaintenance/listbystatus"
        wx.request({
          url: httpsurl, //仅为示例，并非真实的接口地址
          header: {
            'content-type': 'application/json',
            token: app.globalData.userdata.Data.ObjectId
          },
          success: function (res) {
            console.log("可接维修单", res)
            app.globalData.kejieweixiudan = res.data.Data
            wx.showModal({
              title: '提示',
              showCancel: false,
              content: '上传成功',
              success: function (res) {
                if (res.confirm) {
                  wx.navigateBack({
                    delta: 1
                  })
                }
              }
            })
          }
        })
      }
    })
  }

})
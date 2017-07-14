// pages/weixiujilu/accept/accept.js
var app = getApp()
var util = require("../../../utils/util.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data1: [
      // { key: "订单编号", val: '1245678988' },
      // { key: "联系人电话", val: '13991265566' },
      // { key: "联系人姓名", val: '水岸东方' },
      // { key: "接单时间", val: '2017-12-12' },
      // { key: "订单状态", val: '已受理待维修' },
    ],
    data2: [
      // { key: "设备问题描述", val: "坏了" },
      // { key: "备注", val: "无" }
    ],
    data3: [
      // { key: "维修人员姓名", val: '小王' },
      // { key: "维修人员电话", val: '1399165588' },
    ],
    id: "",
    ifjiedanshow: true
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
    var maintence
    var renyuan = []
    console.log("weixiudan", app.globalData.kejieweixiudan)
    for (var i = 0; i < app.globalData.kejieweixiudan.length; i++) {
      if (id == app.globalData.kejieweixiudan[i].MaintenanceId) {
        maintence = app.globalData.kejieweixiudan[i]
        break
      }
    }
    var httpsurl = app.globalData.url + "api/accepMaintenance/list"
    wx.request({
      url: httpsurl, //仅为示例，并非真实的接口地址
      data: { MaintenanceId: maintence.MaintenanceId },
      header: {
        'content-type': 'application/json',
        token: app.globalData.userdata.Data.ObjectId
      },
      success: function (res) {
        console.log("维修人员", res)
        for (var i = 0; i < res.data.Data.length; i++) {
          if (id == res.data.Data[i].MaintenanceId) {
            renyuan.push({ name: res.data.Data[i].RealName, telephone: res.data.Data[i].Mobile, time: res.data.Data[i].CreateDate })
          }
          if (res.data.Data[i].RealName == app.globalData.userdata.Data.UserName) {
            that.setData({
              ifjiedanshow: false
            })
          }
        }
        that.setData({
          data1: [
            { key: "报修人电话", val: maintence.CientTel },
            { key: "报修人姓名", val: maintence.Client },
            { key: "受理时间", val: util.formatTime(renyuan[0].time) },
            { key: "上门时间", val: maintence.SuitTime },
            { key: "订单状态", val: "受理" },

          ],
          data2: [
            { key: "设备问题描述", val: maintence.Question },
            { key: "备注", val: maintence.Note }
          ],
          data3: renyuan
        })
      }
    })

  },
  confirm: function (e) {
    var that=this
    var item = {
      MaintenanceId: that.data.id,
      CompanyId: app.globalData.userdata.Data.CompanyId,
      UserId:app.globalData.userdata.Data.UserId
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
  },
  onunload: function () {
    this.seaData({
      ifjiedanshow: true
    })
  }
})
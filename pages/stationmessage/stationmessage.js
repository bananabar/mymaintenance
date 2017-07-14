// pages/stationmessage/stationmessage.js
var app = getApp();
var util = require('../../utils/util.js')
Page({
  data: {
    smdetail: [],
    canshu: "",
    jpgurl: "",
    record: [],
    ifshow: false,
    EquipmentId: ""
  },
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    var that = this;
    var equipmentdata;
    var id=options.id
    console.log(id)
    var httpsurl = app.globalData.url + "api/equipmentInfo/listbyKSId"
    wx.request({
      url: httpsurl, //仅为示例，并非真实的接口地址
      data: { KSId: id },
      header: {
        'content-type': 'application/json',
        token: app.globalData.userdata.Data.ObjectId
      },
      success: function (res) {
        console.log("设备信息", res)
        equipmentdata = res.data.Data[0]
        console.log(equipmentdata.BuyDate)
        that.setData({
          smdetail: [
            { key: "设备名称", val: equipmentdata.Name },
            { key: "KS编码", val: equipmentdata.KSID },
            { key: "生产产家", val: equipmentdata.Producer },
            { key: "安装地点", val: equipmentdata.Address },
            { key: "GPS经度", val: equipmentdata.GPSX },
            { key: "GPS纬度", val: equipmentdata.GPSY },
            { key: "购买时间", val: util.formatTime(equipmentdata.BuyDate) },
            { key: "安装时间", val: util.formatTime(equipmentdata.InstallDate) },
            { key: "设备状态", val: equipmentdata.Status },
          ],
          canshu: equipmentdata.Parameter,
          jpgurl: equipmentdata.JpgUrl,
          ifshow: true,
          EquipmentId: equipmentdata.EquipmentId
        })
        setTimeout(function () {
          wx.hideLoading()
        }, 500)
      }
    })
    
    // 页面初始化 options为页面跳转所带来的参数
    
    
    //console.log("url",url)
    

    

    // wx.hideNavigationBarLoading()



  },
  record: function () {
    var url = 'Record/Record?EquipmentId=' + this.data.EquipmentId
    console.log(url)
    wx.navigateTo({
      url: url
    })
  },
  parameter: function () {
    var url = 'Parameter/Parameter?parameter=' + this.data.canshu
    wx.navigateTo({
      url: url
    })
  },
  baoxiu: function () {
    var url = '../baoxiu/baoxiu?EquipmentId=' + this.data.EquipmentId
    wx.navigateTo({
      url: url
    })
  },
  onUnload: function () {
    this.setData({
      ifshow: false
    })
  }
})
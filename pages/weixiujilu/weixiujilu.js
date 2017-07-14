//获取应用实例
var app = getApp()

Page({
  data: {
    weixiudata: [],
    appointmentNum: 5,
    appointmentTime: '2017年2月16日  11:42',
    orderTime: '2017年1月16日  11:42',
    hasData: true,
    navTab: ["已受理", "待评价", "已评价"],
    moneyInfo: [, , , , , , ,],
    nickName: "",
    phoneNum: '18202801506',
    url: '/Image/zhandian2.png',
    statusImage: ['/Image/weiwancheng.png', '/Image/wancheng.png'],
    currentNavtab: 1,
    statusText: ['已受理待维修', '已维修待评价', '已完成'],
    startPoint: [0, 0],
    updatemaintence: [
      // { id: 123456789, clientTel: '15757126213', name: '天伦盛世', date: '2017-01-02 11:44', client: '王Sir', suittime: '8点到17点' },
      // { id: 987654321, clientTel: '15757126213', name: '天伦盛世', date: '2017-01-02 11:44', client: '赵Sir', suittime: '8点到17点' }
    ],
    acceptmaintence: [
      // { id: 987654321, clientname: '天伦盛世', clientTel: '15757126213', date: '2017-01-03 11:44', servicer: '小钱', sercicertel: '1575126212' },
      // { id: 987654321, clientname: '天伦盛世', clientTel: '15757126213', date: '2017-01-03 11:44', servicer: '小孙', sercicertel: '1575126212' }
    ],
    waiteluvation: [
      // { id: 987654321, clientname: '天伦盛世', clientTel: '15757126213', date: '2017-01-03 11:44', servicer: '小钱', maintencetime: '2.5h' },
      // { id: 987654321, clientname: '天伦盛世', clientTel: '15757126213', date: '2017-01-03 11:44', servicer: '小孙', maintencetime: '2.5h' }
    ],
    eluvation: [
      // { id: 987654321, clientname: '天伦盛世', clientTel: '15757126213', date: '2017-01-03 11:44', lever: '满意', servicer: '小钱' },
      // { id: 987654321, clientname: '天伦盛世', clientTel: '15757126213', date: '2017-01-03 11:44', lever: '不满意', servicer: '小孙' }
    ],
  },



  switchTab: function (e) {
    this.setData({
      currentNavtab: e.currentTarget.dataset.idx
    });
  },


  callEvent: function (e) {
    console.log(e)
    wx.makePhoneCall({
      phoneNumber: this.data.phoneNum
    })
  },


  update: function (e) {
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: 'update/update?id=' + id,
    })

  },
  accept: function (e) {
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: 'accept/accept?id=' + id,
    })
  },
  eluvation: function (e) {
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: 'eluvation/eluvation?id=' + id,
    })
  },
  complete: function (e) {
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: 'complete/complete?id=' + id,
    })
  },


  // 加载
  onShow: function () {

    var that = this
    //更新数据
    var httpsurl;
    that.setData({
      acceptmaintence: [],
      waiteluvation: [],
      eluvation: [],
      nickName: app.globalData.userdata.Data.UserName
    })

    var updatemaintence = []
    var acceptmaintence = []
    var waiteluvation = []
    var eluvation = []

    var maintence = app.globalData.weixiudan
    var renyuan = app.globalData.weixiurenyuan
    var weixiujilu = app.globalData.weixiujilu
    var pingjia = app.globalData.weixiupingjia
    var equipment = app.globalData.equipment

    for (var i = 0; i < maintence.length; i++) {
      if (maintence[i].Status == "受理") {
        for (var j = 0; j < renyuan.length; j++) {
          if (renyuan[j].MaintenanceId == maintence[i].MaintenanceId) {
            for (var e = 0; e < equipment.length; e++) {
              if (equipment[e].EquipmentId == maintence[i].EquipmentId) {
                acceptmaintence.push({ MaintenanceId: renyuan[j].MaintenanceId, CientTel: maintence[i].CientTel, CreateDate: renyuan[j].CreateDate, Mobile: renyuan[j].Mobile, RealName: renyuan[j].RealName, shebei: equipment[e].Name + equipment[e].KSID })
              }
            }
            break
          }
        }
      }
      if (maintence[i].Status == "已维修") {
        for (var j = weixiujilu.length - 1; j > -1; j--) {
          if (weixiujilu[j].MaintenanceId == maintence[i].MaintenanceId) {
            for (var e = 0; e < equipment.length; e++) {
              if (equipment[e].EquipmentId == maintence[i].EquipmentId) {
                waiteluvation.push({ MaintenanceId: weixiujilu[j].MaintenanceId, CientTel: maintence[i].CientTel, CreateDate: weixiujilu[j].CreateDate, Evaluation: weixiujilu[j].Evaluation, Question: weixiujilu[j].Question, shebei: equipment[e].Name + equipment[e].KSID })
                console.log(weixiujilu[j])
                break
              }
            }
          }
        }
      }
      if (maintence[i].Status == "已评价") {
        for (var j = 0; j < pingjia.length; j++) {
          if (pingjia[j].MaintenanceId == maintence[i].MaintenanceId) {
            for (var e = 0; e < equipment.length; e++) {
              if (equipment[e].EquipmentId == maintence[i].EquipmentId) {
                eluvation.push({ MaintenanceId: maintence[i].MaintenanceId, CientTel: maintence[i].CientTel, CreateDate: pingjia[j].CreateDate, Lever: pingjia[j].Lever, Description: pingjia[j].Description, shebei: equipment[e].Name + equipment[e].KSID })
              }
            }
          }
        }
      }
    }
    that.setData({
      acceptmaintence: acceptmaintence,
      waiteluvation: waiteluvation,
      eluvation: eluvation
    })

  }
})

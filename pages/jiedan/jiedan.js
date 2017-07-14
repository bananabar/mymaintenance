//获取应用实例
var app = getApp()
Page({
  data: {
    weixiudata: [],
    appointmentNum: 5,
    hasData: true,
    navTab: ["待受理", "已受理"],
    moneyInfo: [, , , , , , ,],
    nickName: "",

    url: '/Image/zhandian2.png',
    statusImage: ['/Image/weiwancheng.png', '/Image/wancheng.png'],
    currentNavtab: 1,
    statusText: ['已上报待受理', '已受理待维修'],
    startPoint: [0, 0],
    updatemaintence: [
      // { id: 123456789, clientTel: '15757126213', name: '天伦盛世', date: '2017-01-02 11:44', client: '王Sir', suittime: '8点到17点' },
      // { id: 987654321, clientTel: '15757126213', name: '天伦盛世', date: '2017-01-02 11:44', client: '赵Sir', suittime: '8点到17点' }
    ],
    acceptmaintence: [
      // { id: 987654321, clientname: '天伦盛世', clientTel: '15757126213', date: '2017-01-03 11:44', servicer: '小钱', sercicertel: '1575126212' },
      // { id: 987654321, clientname: '天伦盛世', clientTel: '15757126213', date: '2017-01-03 11:44', servicer: '小孙', sercicertel: '1575126212' }
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


  // 加载
  onShow: function () {

    var that = this
    //更新数据
    var httpsurl;
    that.setData({
      updatemaintence: [],
      acceptmaintence: [],
      nickName: app.globalData.userdata.Data.UserName
    })

    var updatemaintence = []
    var acceptmaintence = []



    var maintence = app.globalData.kejieweixiudan
    var equipment = app.globalData.equipment

    for (var i = 0; i < maintence.length; i++) {
      for (var e = 0; e < equipment.length; e++) {
        if (equipment[e].EquipmentId == maintence[i].EquipmentId) {
          if (maintence[i].Status == "未受理" && maintence[i].CientTel != null) {

            updatemaintence.push({ MaintenanceId: maintence[i].MaintenanceId, Client: maintence[i].Client, CientTel: maintence[i].CientTel, SuitTime: maintence[i].SuitTime, CreateDate: maintence[i].CreateDate, shebei: equipment[e].Name + equipment[e].KSID })
          }
          if (maintence[i].Status == "受理") {
            acceptmaintence.push({ MaintenanceId: maintence[i].MaintenanceId, Client: maintence[i].Client, CientTel: maintence[i].CientTel, SuitTime: maintence[i].SuitTime, CreateDate: maintence[i].CreateDate, shebei: equipment[e].Name + equipment[e].KSID })
          }
        }

        that.setData({
          updatemaintence: updatemaintence,
          acceptmaintence: acceptmaintence,
        })
      }
    }
  }
})

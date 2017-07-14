// pages/weixiujilu/starteluvation/starteluvation.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [
      { id: 1, value: '完成', checked: false },
      { id: 2, value: '未完成', checked: false },
    ],
    id: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id
    this.setData({
      id: id
    })
  },

  checkboxChange: function (e) {
    var id = e.detail.value
    var items = this.data.items
    var idd = id.length == 1 ? id[0] : id[1]
    var that = this
    for (var i = 0; i < items.length; i++) {
      items[i].checked = items[i].id != idd ? false : true
    }
    that.setData({
      items: items
    })
  },
  formSubmit: function (e) {
    var that = this
    var jieguo = "未完成"
    if (this.data.items[0].checked) {
      jieguo = "完成"
    }
    var result = e.detail.value;
    var auth = true;
    for (var i in result) {
      var obj = result[i];
      if (obj == "") {
        wx.showModal({
          title: '提示',
          content: '请您将维修记录填写完整',
        })
        auth = false;
        return;
      }
    };
    if (!auth) {
      return;
    }

    var item = {
      MaintenanceId: that.data.id,
      Evaluation: result.Evaluation,
      Question: result.Question,
      Note: result.Note,
      EngineerId: app.globalData.userdata.Data.UserId,
      ClientCost: result.ClientCost,
      CompanyCost: result.CompanyCost,
      MaintenanceTime: result.MaintenanceTime,
      Result: jieguo
    }
    console.log(item)
    var httpsurl = app.globalData.url + "api/maintenanceRecord/insert";
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
        httpsurl = app.globalData.url + "api/maintenanceRecord/listbyEngineerID"
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
            httpsurl = app.globalData.url + "api/updateMaintenance/listbyEngineerID"
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
                wx.showModal({
                  title: '提示',
                  showCancel: false,
                  content: '上传成功',
                  success: function (res) {
                    if (res.confirm) {
                      wx.navigateBack({
                        delta: 2
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
  }
})
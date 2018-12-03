'use strict'

const Controller = require('egg').Controller
const request = require('request')

class BaseController extends Controller {
  /** 【controller】获取用户的openid */
  async getOpenId() {
    let result // 返回的结果
    const code = this.ctx.request.body.code // 前端传入的临时凭证code
    const appid = this.config.wx.appid
    const appSecret = this.config.wx.appSecret
    const wxUrl = `https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${appSecret}&js_code=${code}&grant_type=authorization_code`

    // 通过code获取用户信息的数据
    let codeBody = await new Promise((resolve, reject) => {
      request(wxUrl, (error, response, body) => {
        // 只能表示请求正常，无法确定是否返回了openid等正确信息
        if (!error && response.statusCode === 200) {
          // 输出返回的内容
          resolve(body)
        } else {
          console.log('[error][获取凭证出错]', error)
          reject()
        }
      })
    })

    // 调用获取openid接口返回的body为JSON格式的字符串，这里把字符串解析成Object
    if (typeof codeBody === 'string') {
      codeBody = JSON.parse(codeBody)
    }

    if (codeBody.openid) {
      result = {
        returnCode: 0,
        data: codeBody,
      }
    } else {
      result = {
        returnCode: codeBody.errcode,
        data: null,
        errMsg: codeBody.errmsg,
      }
    }

    this.ctx.body = result
  }
}

module.exports = BaseController

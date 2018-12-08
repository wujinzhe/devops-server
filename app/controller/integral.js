'use strict'

const Controller = require('egg').Controller

class integralController extends Controller {
  /** 【controller】为用户添加一个积分信息 */
  async addIntegral() {
    const { openId, integral, content } = this.ctx.request.body
    const result = {
      returnCode: 0,
    }

    if (!openId || !integral || !content) {
      throw new Error('缺少参数')
    }

    try {
      await this.ctx.service.addIntegral({
        openId,
        integral,
        content,
      })
    } catch (err) {
      console.log('[error][添加积分]', err.message)
      result.errMsg = '服务器错误，请稍后重试'
      result.returnCode = -1
    }

    this.ctx.body = result
  }
}

module.exports = integralController

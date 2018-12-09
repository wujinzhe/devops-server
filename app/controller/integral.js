'use strict'

const Controller = require('egg').Controller

class integralController extends Controller {
  /** 【controller】为用户添加一个积分信息 */
  async addIntegral() {
    console.log('integral')
    const { openId, integral, content } = this.ctx.request.body
    const result = {
      returnCode: 0,
    }

    if (!openId || !integral || !content) {
      throw new Error('缺少参数')
    }

    try {
      await this.ctx.service.integral.addIntegral({
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

  /** 【controller】获取积分列表 */
  async getIntegralList() {
    const { openId, currentPage, pageSize } = this.ctx.request.body
    const result = {
      returnCode: 0,
    }

    try {
      result.data = await this.ctx.service.integral.getIntegralList({
        openId,
        currentPage,
        pageSize,
      })
    } catch (err) {
      result.errMsg = '服务器异常，请稍后重试'
      result.returnCode = -1
    }

    this.ctx.body = result
  }

}

module.exports = integralController

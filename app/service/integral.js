'use strict'

const Service = require('egg').Service

class IntegralService extends Service {
  /**
   * 【service】添加一种积分给用户
   * @param {Object} integralInfo 积分对象
   * @return {Promise} 返回的结果
   */
  addIntegral(integralInfo) {
    const { openId, integral, content } = integralInfo
    return this.ctx.model.integral.create({
      openId,
      integral,
      date: new Date(),
      content,
    })
  }
  /**
   * 【service】添加一种积分给用户
   * @param {String} openId 用户id
   * @param {String} currentPage 当前页
   * @param {String} pageSize 页数
   * @return {Promise} 返回的结果
   */
  getIntegralList(openId, currentPage = 1, pageSize = 6) {
    return this.ctx.model.integral.findAll({
      openId,
      currentPage,
      pageSize,
    })
  }
}

module.exports = IntegralService

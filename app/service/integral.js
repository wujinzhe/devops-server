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
    return this.ctx.model.Integral.create({
      openId,
      integral,
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
    return this.ctx.model.Integral.findAll({
      openId,
      currentPage,
      pageSize,
    })
  }

  /**
   *  【service】给用户添加或者减去响应的积分
   * @param {String} openId 用户id
   * @param {Number} score 添加或者减去的积分
   * @return {Promise} 返回的对象
   */
  updateScore(openId, score) {
    return this.ctx.model.UserDevopsInfo.findOne({ where: { openId } }).then(info => {
      return info.increment('integral', { by: score })
    })
  }
}

module.exports = IntegralService

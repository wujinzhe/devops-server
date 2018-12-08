'use strict'

const Service = require('egg').Service

class UserService extends Service {
  /**
   * 【service】根据openid获取用户的基础信息
   * @param {String} openid 用户的openid
   * @return {Object} user
   */
  async getUserBaseInfo(openid) {
    const user = await this.ctx.model.UserBase.findOne({
      where: {
        openId: openid,
      },
    })
    return user && user.dataValues || null
  }


  /**
   * 【service】将用户的基础信息添加进数据库（在用户第一次进入时调用）
   * @param {Object} userData 用户基础信息对象
   * @return {Promise} 添加成功后返回的数据
   */
  addUserBase(userData) {
    return this.ctx.model.UserBase.findCreateFind({
      where: {
        openId: userData.openid,
      },
      defaults: {
        openId: userData.openid,
        nickName: userData.nickName,
        headUrl: userData.headUrl,
        startTime: new Date(),
        latestTime: new Date(),
      },
    })
  }

  /**
   * 【service】添加用户信息
   * @param {Object} userInfo 用户信息对象
   * @return {Promise} 添加成功后返回的数据
   */
  addUserInfo(userInfo) {
    return this.ctx.model.UserInfo.findCreateFind({
      where: {
        openId: userInfo.openId,
      },
      defaults: {
        openId: userInfo.openId,
        nickName: userInfo.nickName,
      },
    })
  }

  /** 【service】更新用户的最后一次进入的时间
   * @param {String} openid 用户的openid
   * @return {Object} 修改的结果
   */
  async updateUserBaseTime(openid) {
    return await this.ctx.model.UserBase.update({
      latestTime: new Date(),
    }, {
      where: {
        openId: openid,
      },
    })
  }
}

module.exports = UserService

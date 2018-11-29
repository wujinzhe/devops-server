'use strict'

const dayjs = require('dayjs')
const Service = require('egg').Service

class UserService extends Service {
  /**
   * 根据openid获取用户的基础信息
   * @param {String} openid 用户的openid
   * @return {Object} user
   */
  async getUserBaseInfo(openid) {
    const user = await this.ctx.model.UserBase.findOne({
      where: {
        openId: openid,
      },
    })
    return user && user.dataValues || {}
  }


  /**
   * 【service】添加基础用户信息
   * @param {Object} userData 用户基础信息对象
   * @return {Object} 添加成功后返回的数据
   */
  async addUserBase(userData) {
    // console.log(dayjs().format('YYYY-MM-DD HH:mm:ss'))
    return await this.ctx.model.UserBase.create({
      openId: userData.openid,
      nickName: userData.nickName,
      headUrl: userData.headUrl,
      startTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      latestTime: new Date(),
    })
  }

  /** 【service】更新用户的最后一次登录的时间
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

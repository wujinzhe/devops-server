'use strict'

const Controller = require('egg').Controller

class UserController extends Controller {
  /**
   * 获取用户的基础信息（微信中的头像，昵称等）
   */
  async getUserBaseInfo() {
    const { openid } = this.ctx.query
    const result = {
      returnCode: 0,
    }

    try {
      const info = await this.ctx.service.user.getUserBaseInfo(openid)
      result.data = info
    } catch (err) {
      console.log('[error][查询用户基础表]', err.message)
      result.returnCode = -1
      result.errMsg = '服务器异常，请稍后重试'
      result.data = null
    }

    this.ctx.body = result
  }

  /**
   * 【controller】添加基础用户信息
   */
  async addUserBase() {
    const result = {
      returnCode: 0,
    }
    const data = this.ctx.request.body
    console.log('[info][添加基础用户信息][请求参数]', JSON.stringify(data))
    try {
      const isAdd = (await this.ctx.service.user.addUserBase(data))[1]
      if (isAdd) {
        await this.ctx.service.task.initTaskForUser(data.openid, '3')
        await this.ctx.service.user.addUserInfo({
          openId: data.openid,
          nickName: data.nickName,
        })
      } else {
        result.errMsg = '数据已经存在'
      }
    } catch (err) {
      console.log('[error][添加基础用户信息]', err.message)
      result.errMsg = '服务器异常，请稍后重试'
      result.returnCode = -1
    }

    this.ctx.body = result
  }

  /** 【controller】修改用户最后一次登录的时间 */
  async updateUserBaseTime() {
    const openid = this.ctx.request.body.openid
    console.log('[info][修改用户最后一次登录的时间][请求参数]', openid)
    const result = {
      returnCode: 0,
    }

    try {
      await this.ctx.service.user.updateUserBaseTime(openid)
    } catch (err) {
      console.log('[error][修改用户最后一次登录的时间]', err)
      result.errMsg = '服务器异常，请稍后重试'
      result.returnCode = -1
    }

    this.ctx.body = result
  }

  /**
   * 【controller】更新用户信息
   */
  async updateUserInfo() {
    const result = {
      returnCode: 0,
    }
    try {
      await this.ctx.service.user.updateUserInfo(this.ctx.request.body)
    } catch (err) {
      console.log('[error][更新用户信息]', err.message)
      result.errMsg = '服务器错误，请稍后重试'
      result.returnCode = -1
    }

    this.ctx.service.task.updateTaskStatus(this.ctx.request.body.openId, 1, 2)
    this.ctx.service.task.updateTaskStatus(this.ctx.request.body.openId, 3, 2)

    this.ctx.body = result
  }

  /**
   * 【controller】获取用户信息
   */
  async getUserInfo() {
    const { openId } = this.ctx.query
    const result = {
      returnCode: 0,
    }
    try {
      result.data = await this.ctx.service.user.getUserInfo(openId)
    } catch (err) {
      console.log('[error][获取用户信息]', err.message)
      result.errMsg = '服务器错误，请稍后重试'
      result.returnCode = -1
    }

    this.ctx.body = result
  }

  /**
 * 【controller】获取用户的dev信息
 */
  async getUserDevopsInfo() {
    const { openId } = this.ctx.query
    const result = {
      returnCode: 0,
    }

    try {
      result.data = (await this.ctx.service.user.getUserDevopsInfo(openId))[0]
    } catch (err) {
      console.log('[error][获取用户的dev信息]')
      result.errM = '服务器异常，请稍后重试'
      result.returnCode = -1
    }

    this.ctx.body = result
  }
}

module.exports = UserController

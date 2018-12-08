'use strict'

const Controller = require('egg').Controller

class TaskController extends Controller {
  /**
   * 获取任务列表
   */
  async getTaskList() {
    const { openid, status, pageSize, currentPage } = this.ctx.query
    const result = {
      returnCode: 0,
    }
    console.log('[info][获取任务列表][请求参数]', this.ctx.query)
    try {
      if (!openid || status === undefined) {
        result.errMsg = '缺少请求参数'
        throw new Error('缺少请求参数')
      }
      const data = await this.ctx.service.task.getTaskList(openid, status, pageSize, currentPage)
      data.forEach(item => {
        item.status = item['taskUser.status']
        item.id = item['taskUser.id']
        item.isReceive = item['taskUser.isReceive']
      })
      result.data = data
    } catch (err) {
      result.returnCode = -1
      result.data = null
      result.errMsg = '服务器异常，请稍后重试'
      console.log('[error][查询任务列表]', err.message)
    }

    this.ctx.body = result
  }

  /**
   * 【controller】认领任务
   */
  async claimTask() {
    const { openid, taskId } = this.ctx.request.body
    const result = {
      returnCode: 0,
    }

    try {
      await this.ctx.service.task.updateTaskStatus(openid, taskId, 1)
    } catch (err) {
      console.log('[err][认领任务]', err.message)
      result.errMsg = '服务器异常，请稍后重试'
      result.returnCode = -1
    }

    this.ctx.body = result
  }

  /**
   * 【controller】完成任务
   */
  async finishTask() {
    const { openid, taskId } = this.ctx.request.body
    const result = {
      returnCode: 0,
    }

    try {
      await this.ctx.service.task.updateTaskStatus(openid, taskId, 2)
    } catch (err) {
      console.log('[err][完成任务]', err.message)
      result.errMsg = '服务器异常，请稍后重试'
      result.returnCode = -1
    }

    this.ctx.body = result
  }

  /**
   * 【controller】领取积分
   */
  async receiveIntegral() {
    const { openid, taskId } = this.ctx.request.body
    const result = {
      returnCode: 0,
    }

    try {
      await this.ctx.service.task.updataTaskIsReceive(openid, taskId, 1)
    } catch (err) {
      console.log('[err][领取积分]', err.message)
      result.errMsg = '服务器异常，请稍后重试'
      result.returnCode = -1
    }

    this.ctx.body = result
  }
}

module.exports = TaskController

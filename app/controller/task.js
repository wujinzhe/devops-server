'use strict'

const Controller = require('egg').Controller

class TaskController extends Controller {
  /**
   * 获取任务列表
   */
  async getTaskList() {
    const { userId, status, pageSize, currentPage } = this.ctx.request.body
    const result = {
      returnCode: 0,
    }
    try {
      const data = await this.ctx.service.task.getTaskList(userId, status, pageSize, currentPage)
      data.forEach(item => {
        item.status = item['taskUser.status']
      })
      result.data = data
    } catch (err) {
      result.returnCode = -1
      result.data = null
      console.log('[error][查询任务列表]', err.message)
    }

    this.ctx.body = result
  }

  /**
   * 为用户初始化任务
   */
  async initTaskForUser() {
    // const { openid } = this.ctx.request.body
    const list = await this.ctx.service.task.initTaskForUser('1', '3')
    const result = {
      returnCode: 0,
      data: list,
    }

    this.ctx.body = result
  }
}

module.exports = TaskController

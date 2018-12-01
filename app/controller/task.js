'use strict'

const Controller = require('egg').Controller

class TaskController extends Controller {
  /**
   * 获取任务列表
   */
  async getTaskList() {
    const { userId, status } = this.ctx.body
    this.ctx.service.task.getTaskList(userId, status)
  }
}

module.exports = TaskController

'use strict'

const Service = require('egg').Service

class TaskService extends Service {
  /**
   * 获取任务列表
   * @param {String} openid 用户id
   * @param {Number} status 任务的状态
   * @param {Number} pageSize 每页的条数
   * @param {Number} currentPage 当前页数
   * @return {Promise} 查询的结果
   */
  getTaskList(openid, status, pageSize = 8, currentPage = 1) {
    return this.ctx.model.TaskInfo.findAll({
      include: [
        {
          model: this.ctx.model.TaskUser,
          as: 'taskUser',
          where: {
            userId: openid,
            status,
          },
          attributes: [ 'status' ],
        },
      ],
      raw: true,
      offset: (currentPage - 1) * pageSize,
      limit: pageSize,
      attributes: [ 'taskId', 'integral', 'title', 'desc', 'endDate' ],
    })
  }

  /**
   * 为用户初始化任务
   * @param {String} openid 用户id
   * @param {String} typeId 所分配的任务的类型id
   * @return {*} 任务列表
   */
  async initTaskForUser(openid, typeId) {
    const initTaskList = await this.ctx.model.TaskInfo.findAll({
      where: {
        typeId,
      },
    })

    console.log(initTaskList)
    return initTaskList
  }
}

module.exports = TaskService

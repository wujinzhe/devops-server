'use strict'

const Service = require('egg').Service

class TaskService extends Service {
  /**
   * 【service】获取任务列表
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
      offset: Number((currentPage - 1) * pageSize),
      limit: Number(pageSize),
      attributes: [ 'taskId', 'integral', 'title', 'desc', 'endDate' ],
    })
  }

  /**
   * 【service】为用户初始化任务（在用户第一次进入时调用）
   * @param {String} openid 用户id
   * @param {String} typeId 所分配的任务的类型id
   */
  async initTaskForUser(openid, typeId) {
    const fieldList = []
    const initTaskList = await this.ctx.model.TaskInfo.findAll({
      where: {
        typeId,
      },
      attributes: [ 'taskId' ],
    })


    initTaskList.forEach(item => {
      fieldList.push({
        taskId: item.taskId,
        userId: openid,
        status: 0,
        isReceive: 0,
      })
    })

    await this.ctx.model.TaskUser.bulkCreate(fieldList)
  }

  /**
   * 【service】更新任务状态（暂时未判断该任务的当前状态）
   * @param {String} openid 用户的id
   * @param {Number} taskId 任务id
   * @param {Number} status 需要更新到的状态
   * @return {Promise} 更新结果
   */
  updateTaskStatus(openid, taskId, status) {
    return this.ctx.model.TaskUser.update({
      status,
    },
    {
      where: {
        userId: openid,
        taskId,
      },
    })
  }

  /**
   * 【service】更新任务是否被领取积分 （）
   * @param {String} openid 用户的id
   * @param {Number} taskId 任务id
   * @param {Number} isReceive 需要更新到领取积分的状态
   * @return {Promise} 更新结果
   */
  updataTaskIsReceive(openid, taskId, isReceive) {
    return this.ctx.model.TaskUser.update({
      isReceive,
    },
    {
      where: {
        userId: openid,
        taskId,
      },
    })
  }
}

module.exports = TaskService

'use strict'

/**
 * @param {Egg.Application} app egg的app实例
 */
module.exports = app => {
  const { router, controller } = app

  router.get('/task/getTaskList', controller.task.getTaskList) // 获取任务列表
  router.post('/task/initTaskForUser', controller.task.initTaskForUser)
}

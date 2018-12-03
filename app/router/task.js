'use strict'

/**
 * @param {Egg.Application} app egg的app实例
 */
module.exports = app => {
  const { router, controller } = app

  router.get('/task/getTaskList', controller.task.getTaskList) // 获取任务列表
  router.post('/task/claimTask', controller.task.claimTask) // 认领任务
  router.post('/task/finishTask', controller.task.finishTask) // 完成任务
  router.post('/task/receiveIntegral', controller.task.receiveIntegral) // 领取积分
}

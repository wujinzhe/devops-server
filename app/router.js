'use strict'

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  require('./router/base')(app) // 基础接口
  require('./router/user')(app) // 用户
  require('./router/task')(app) // 任务
}

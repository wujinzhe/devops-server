'use strict'

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app
  router.get('/user/add', controller.user.add)

  router.get('/project/list', controller.project.list)
  router.post('/project/add', controller.project.add)
}

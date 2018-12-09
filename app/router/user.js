'use strict'

/**
 * @param {Egg.Application} app egg的app实例
 */
module.exports = app => {
  const { router, controller } = app

  router.get('/user/getUserBaseInfo', controller.user.getUserBaseInfo)
  router.post('/user/addUserBase', controller.user.addUserBase)
  router.post('/user/updateUserBaseTime', controller.user.updateUserBaseTime)
  router.get('/user/getUserInfo', controller.user.getUserInfo)
  router.post('/user/updateUserInfo', controller.user.updateUserInfo)
  router.get('/user/getUserDevopsInfo', controller.user.getUserDevopsInfo)
}

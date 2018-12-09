'use strict'

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app

  router.post('/integral/addIntegral', controller.integral.addIntegral)
  router.get('/integral/getIntegralList', controller.integral.getIntegralList)
}

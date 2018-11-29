'use strict'

module.exports = appInfo => {
  const config = exports = {}

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1540089840391_6428'

  // add your config here
  config.middleware = []
  // 本地sequelize的配置
  config.sequelize = {
    dialect: 'mysql', // support: mysql, mariadb, postgres, mssql
    database: 'devops',
    host: '115.28.65.42',
    port: '3306',
    username: 'root',
    password: '123456',
  }

  // 微信小程序配置信息
  config.wx = {
    appid: 'wxe211b23bf953a522',
    appSecret: 'e39c0e48f59e8763a70778b837fd4445',
    // appid: 'wx4993b00849ef721c',
    // appSecret: 'c31230c95767f5e2c9c40667e2f1dd65',
  }

  return config
}

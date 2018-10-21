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
    database: 'devpos',
    host: 'localhost',
    port: '3306',
    username: 'root',
    password: 'root',
  }

  return config
}

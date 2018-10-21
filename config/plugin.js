'use strict'

// had enabled by egg
// exports.static = true;
// 使用sequelize
exports.sequelize = {
  enable: true,
  package: 'egg-sequelize',
  delegate: 'model',
  baseDir: 'model',
  timezone: '+08:00',
}

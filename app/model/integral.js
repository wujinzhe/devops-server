'use strict'
const dayjs = require('dayjs')
module.exports = app => {
  const { STRING, INTEGER, DATE, NOW } = app.Sequelize

  const Integral = app.model.define('integral', {
    id: {
      type: INTEGER,
      primaryKey: true,
    },
    openId: {
      type: STRING(40),
      field: 'openid',
      comments: '用户的openId',
    },
    integral: {
      type: INTEGER,
    },
    date: {
      type: DATE,
      defaultValue: NOW,
      get() {
        return dayjs(this.getDataValue('date')).format('YYYY-MM-DD HH:mm:ss')
      },
    },
    content: {
      type: STRING(100),
    },
  }, {
    freezeTableName: true, // 数据库模型的名称和实际数据库名称保持一致
    timestamps: false,
  })

  return Integral
}

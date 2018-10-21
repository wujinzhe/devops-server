'use strict'

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize

  const User = app.model.define('user', {
    openId: {
      type: STRING(30),
      primaryKey: true,
    },
    name: STRING(20),
    sex: INTEGER,
    headUrl: {
      type: STRING,
      field: 'head_url',
    },
    startTime: {
      type: DATE,
      field: 'start_time',
    },
    latestTime: {
      type: DATE,
      field: 'latest_time',
    },
  }, {
    freezeTableName: true, // 数据库模型的名称和实际数据库名称保持一致
    timestamps: false,
  })

  return User
}

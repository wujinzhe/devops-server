'use strict'

module.exports = app => {
  const { STRING, DATE } = app.Sequelize

  const UserBase = app.model.define('user_base', {
    openId: {
      type: STRING(30),
      primaryKey: true,
      field: 'open_id',
      comments: '用户的openId',
    },
    nickName: {
      type: STRING(20),
      field: 'nick_name',
    },
    headUrl: {
      type: STRING(100),
      field: 'head_url',
    },
    startTime: {
      type: STRING(30),
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

  return UserBase
}

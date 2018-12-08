'use strict'

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize

  const UserInfo = app.model.define('user_info', {
    openId: {
      type: STRING(40),
      primaryKey: true,
      field: 'openid',
      comments: '用户的openId',
    },
    nickName: {
      type: STRING(20),
      field: 'nick_name',
    },
    name: {
      type: STRING(11),
      field: 'name',
    },
    birthday: {
      type: STRING(20),
    },
    phone: {
      type: STRING(11),
    },
    sex: {
      type: INTEGER,
    },
    city: {
      type: STRING(11),
    },
    job: {
      type: STRING(11),
    },
  }, {
    freezeTableName: true, // 数据库模型的名称和实际数据库名称保持一致
    timestamps: false,
  })

  return UserInfo
}

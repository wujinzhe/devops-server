'use strict'

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize

  const UserIntegralList = app.model.define('user_integral_list', {
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
    },
    content: {
      type: STRING(100),
    },
  }, {
    freezeTableName: true, // 数据库模型的名称和实际数据库名称保持一致
    timestamps: false,
  })

  return UserIntegralList
}

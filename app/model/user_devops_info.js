'use strict'

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize

  const UserDevopsInfo = app.model.define('user_devops_info', {
    openId: {
      type: STRING(40),
      primaryKey: true,
      field: 'openid',
      comments: '用户的openId',
    },
    integral: {
      type: INTEGER,
    },
  }, {
    freezeTableName: true, // 数据库模型的名称和实际数据库名称保持一致
    timestamps: false,
  })

  return UserDevopsInfo
}

'use strict'

module.exports = app => {
  const { INTEGER, STRING } = app.Sequelize

  const TaskUser = app.model.define('task_user', {
    id: {
      type: INTEGER,
      primaryKey: true,
      field: 'id',
      comment: '关系id',
    },
    taskId: {
      type: INTEGER,
      field: 'task_id',
      comment: '任务id',
    },
    userId: {
      type: STRING(40),
      field: 'user_id',
      comment: '用户id',
    },
    status: {
      type: INTEGER,
      field: 'status',
      comment: '当前用户该任务的状态',
    },
    isReceive: {
      type: INTEGER,
      field: 'is_receive',
      comment: '是否领取了积分 0 未领取 1 已领取',
    },
  },
  {
    freezeTableName: true, // 数据库模型的名称和实际数据库名称保持一致
    timestamps: false,
  })

  // TaskUser.associate = () => {
  //   app.model.TaskUser.hasOne(app.model.Info, { foreignKey: 'userId' })
  //   app.model.TaskUser.hasMany(app.model.Family, { foreignKey: 'userId', targetKey: 'id' })
  // }

  return TaskUser
}

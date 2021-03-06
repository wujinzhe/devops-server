'use strict'

module.exports = app => {
  const { STRING, INTEGER, DATE, TEXT } = app.Sequelize

  const TaskInfo = app.model.define('task_info', {
    taskId: {
      type: INTEGER,
      primaryKey: true,
      field: 'task_id',
      comment: '任务ID',
    },
    integral: {
      type: INTEGER,
      comment: '任务所需积分',
    },
    typeId: {
      type: STRING(100),
      field: 'type_id',
      comment: '任务类型id',
    },
    title: {
      type: STRING(30),
      comment: '任务标题',
    },
    desc: {
      type: TEXT,
      comment: '任务描述',
    },
    endDate: {
      type: DATE,
      comment: '结束时间',
      field: 'end_date',
    },
  },
  {
    freezeTableName: true, // 数据库模型的名称和实际数据库名称保持一致
    timestamps: false,
  })
  TaskInfo.associate = () => {
    app.model.TaskInfo.hasMany(app.model.TaskUser, { foreignKey: 'task_id', as: 'taskUser' })
  }

  return TaskInfo
}

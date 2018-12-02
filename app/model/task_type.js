'use strict'

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize

  const TaskType = app.model.define('task_type', {
    typeId: {
      type: INTEGER,
      primaryKey: true,
      field: 'type_id',
      comment: '任务类型id',
    },
    typeName: {
      type: STRING(20),
      field: 'type_name',
      comment: '任务类型名称',
    },
  },
  {
    freezeTableName: true, // 数据库模型的名称和实际数据库名称保持一致
    timestamps: false,
  })

  return TaskType
}

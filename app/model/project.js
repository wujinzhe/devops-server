'use strict'

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize

  const Project = app.model.define('project', {
    id: {
      type: INTEGER,
      primaryKey: true,
    },
    name: STRING(20),
    createId: {
      type: STRING(50),
      field: 'create_id',
    },
    introduction: STRING,
    startTime: {
      type: DATE,
      field: 'start_time',
    },
    phone: STRING(12),
    logoUrl: {
      type: STRING(50),
      field: 'logo_url',
    },
  })

  return Project
}

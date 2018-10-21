'use strict'

const Controller = require('egg').Controller

class ProjectController extends Controller {
  async index() {
    this.ctx.body = 'hi, egg'
  }

  async list() {
    this.ctx.body = this.ctx.model.Project.findAll()
  }
}

module.exports = ProjectController

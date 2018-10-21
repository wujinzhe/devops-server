'use strict'

const Controller = require('egg').Controller

class ProjectController extends Controller {
  async index() {
    this.ctx.body = 'hi, egg'
  }

  // 显示所有项目列表
  async list() {
    const list = await this.ctx.model.Project.findAll()
    this.ctx.body = list
  }

  async add() {
    console.log('------------post【添加项目】 请求参数----------------')
    console.log(this.ctx.request.body)
    const data = this.ctx.request.body
    const result = {
      returnCode: 0,
    }

    try {
      await this.ctx.model.Project.create({
        name: data.name,
        phone: data.phone,
        createId: data.createId,
        introduction: data.introduction,
        startTime: data.startTime,
        logoUrl: data.logoUrl,
        createTime: new Date(),
      })
    } catch (err) {
      console.log('× 添加项目', err.message)
      result.errorInfo = '服务器错误'
      result.returnCode = 1
    }

    this.ctx.body = result
  }
}

module.exports = ProjectController

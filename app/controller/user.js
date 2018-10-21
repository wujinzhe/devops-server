'use strict'

const Controller = require('egg').Controller

class UserController extends Controller {
  async add() {
    this.ctx.body = 'hi, egg'
  }
}

module.exports = UserController

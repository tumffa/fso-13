const sequelize = require('../util/db')
const Blog = require('./blog')
const User = require('./user')

User.initModel(sequelize)
Blog.initModel(sequelize)

User.hasMany(Blog)
Blog.belongsTo(User)

Blog.sync({ alter: true })
User.sync({ alter: true })

module.exports = {
  Blog, User
}
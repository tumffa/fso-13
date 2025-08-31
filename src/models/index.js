const sequelize = require('../util/db')
const Blog = require('./blog')
const User = require('./user')
const ReadingList = require('./readinglist')
const Session = require('./session')

User.initModel(sequelize)
Blog.initModel(sequelize)
ReadingList.initModel(sequelize)
Session.initModel(sequelize)

User.hasMany(Blog)
Blog.belongsTo(User)

User.belongsToMany(Blog, { through: ReadingList, foreignKey: 'user_id', otherKey: 'blog_id', as: 'reading_blogs' })
Blog.belongsToMany(User, { through: ReadingList, foreignKey: 'blog_id', otherKey: 'user_id', as: 'readers' })

module.exports = {
  Blog, User, ReadingList, Session
}
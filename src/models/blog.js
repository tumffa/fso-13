const { Model, DataTypes } = require('sequelize')

class Blog extends Model {
  static initModel(sequelize) {
    Blog.init({
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      author: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: 'Author cannot be empty' }
        }
      },
      url: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: 'URL cannot be empty' }
        }
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: 'Title cannot be empty' }
        }
      },
      likes: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      }
    }, {
      sequelize,
      underscored: true,
      timestamps: false,
      modelName: 'blog',
      tableName: 'blogs'
    })
    return Blog
  }
}

module.exports = Blog
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
      },
      year: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: {
            args: [1991],
            msg: 'Year must be 1991 or later'
          },
          max: {
            args: [new Date().getFullYear()],
            msg: `Year cannot be greater than the current year (${new Date().getFullYear()})`
          },
          isInt: {
            msg: 'Year must be an integer'
          }
        }
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
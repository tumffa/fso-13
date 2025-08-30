const { Model, DataTypes } = require('sequelize')

class Blog extends Model {
  static initModel(sequelize) {
    Blog.init({
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      author: DataTypes.STRING,
      url: {
        type: DataTypes.STRING,
        allowNull: false
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
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
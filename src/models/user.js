const { Model, DataTypes } = require('sequelize')

class User extends Model {
  static initModel(sequelize) {
    User.init({
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          notEmpty: { msg: 'Username cannot be empty' }
        }
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: 'Name cannot be empty' }
        }
      },
      passwordHash: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }, {
      sequelize,
      underscored: true,
      modelName: 'user',
      tableName: 'users',
      timestamps: true
    })
    return User
  }
}

module.exports = User
const { Model, DataTypes } = require('sequelize')

class Session extends Model {
  static initModel(sequelize) {
    Session.init({
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      token: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      }
    }, {
      sequelize,
      underscored: true,
      timestamps: true,
      modelName: 'session',
      tableName: 'sessions'
    })
    return Session
  }
}

module.exports = Session

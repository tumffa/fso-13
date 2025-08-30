const { Model, DataTypes } = require('sequelize')

class ReadingList extends Model {
  static initModel(sequelize) {
    ReadingList.init({
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      blog_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      read: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }
    }, {
      sequelize,
      underscored: true,
      timestamps: true,
      modelName: 'reading_list',
      tableName: 'reading_lists'
    })
    return ReadingList
  }
}

module.exports = ReadingList

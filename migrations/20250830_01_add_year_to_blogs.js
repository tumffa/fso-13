const { DataTypes } = require('sequelize')

const MIN_YEAR = 1991
const MAX_YEAR = new Date().getFullYear()

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.addColumn('blogs', 'year', {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: MIN_YEAR,
        max: MAX_YEAR
      },
      defaultValue: MIN_YEAR
    })
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.removeColumn('blogs', 'year')
  },
}

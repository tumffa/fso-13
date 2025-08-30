const { Sequelize } = require('sequelize')
const config = require('./config')
const { Umzug, SequelizeStorage } = require('umzug')

const sequelize = new Sequelize(config.DATABASE_URL)

const runMigrations = async () => {
  const migrator = new Umzug({ 
    migrations: {
      glob: 'migrations/*.js',
    },
    storage: new SequelizeStorage({ sequelize, tableName: 'migrations' }),
    context: sequelize.getQueryInterface(),
    logger: console,
  })
  const migrations = await migrator.up()
  console.log('Migrations up to date', {
    files: migrations.map((mig) => mig.name),
  })
}

runMigrations()

module.exports = sequelize
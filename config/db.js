const Sequelize = require('sequelize')
const env = require('./env')
const sequelize = new Sequelize(env.DATABASE_NAME, env.DATABASE_USERNAME, env.DATABASE_PASSWORD, {
  host: env.DATABASE_HOST,
  port: env.DATABASE_PORT,
  dialect: env.DATABASE_DIALECT,
  define: {
    underscored: true
  }
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize



// IMPORTING

db.users = require('../models/user.js')(sequelize, Sequelize)
db.spots = require('../models/spot.js')(sequelize, Sequelize)
db.tokens = require('../models/token.js')(sequelize, Sequelize)



// RELATIONSHIPS

db.users.hasMany(db.spots, { foreignKey: { onDelete: 'CASCADE' } })
db.spots.belongsTo(db.users)


// possibly this automatically deletes the other token when a new one is created

db.users.hasOne(db.tokens, { foreignKey: { onDelete: 'CASCADE' } })
db.tokens.belongsTo(db.users)



// EXPORTING

module.exports = db

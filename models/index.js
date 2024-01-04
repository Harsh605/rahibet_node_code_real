const dbConfig = require('../config/dbConfig.js');
const {Sequelize,DataTypes} = require('sequelize');
const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,{
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
    }
);

sequelize.authenticate()
// .then(() => {
//     console.log('connected..')
// })   
// .catch(err => {
//     console.log('Error'+ err)
// })

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize
db.aviator = require('./aviatorModel.js')(sequelize, DataTypes);
db.user = require('./userModel.js')(sequelize, DataTypes);
db.game = require('./gameModel.js')(sequelize, DataTypes);
db.setting = require('./settingModel.js')(sequelize, DataTypes);
db.admin = require('./adminModel.js')(sequelize, DataTypes);

db.aviator.hasMany(db.user,{foreignKey: 'id'});
db.user.belongsTo(db.aviator,{foreignKey: 'id'});



db.sequelize.sync({ force: false })
// .then(() => {
//     // console.log('yes re-sync done!')
// })

module.exports = db

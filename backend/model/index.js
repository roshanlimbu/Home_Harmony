const DBconfig = require("../config/dbConfig");

const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(DBconfig.DB, DBconfig.USER, DBconfig.PASSWORD, {
  host: DBconfig.HOST,
  dialect: DBconfig.dialect,
  operatirAlias: false,
  logging: false,
  port: DBconfig.PORT,
  pool: {
    max: DBconfig.max,
    min: DBconfig.min,
    acquire: DBconfig.acquire,
    idle: DBconfig.idle,
  },
});
sequelize
  .authenticate()
  .then(() => {
    console.log("conected to database");
  })
  .catch((err) => {
    console.log("err" + err);
  });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// models
db.users = require("./userModel")(sequelize, DataTypes);
db.product = require("./productModel")(sequelize, DataTypes);
db.cartItem = require("./cartItem")(sequelize, DataTypes);
// db.Transaction = require("./transactionModel")(sequelize, DataTypes);

db.sequelize
  .sync({
    force: false,
  })
  .then(async () => {
    console.log("yes! sync done");
  });

module.exports = db;

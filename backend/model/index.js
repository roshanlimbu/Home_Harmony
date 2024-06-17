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
db.order = require("./orderModel")(sequelize, DataTypes);



// associations

db.users.hasMany(db.cartItem, { foreignKey: 'userId', as: 'cartItems' });
db.product.hasMany(db.cartItem, { foreignKey: 'productId', as: 'cartItems' });
db.cartItem.belongsTo(db.users, { foreignKey: 'userId', as: 'user' });
db.cartItem.belongsTo(db.product, { foreignKey: 'productId', as: 'product' })




db.sequelize
  .sync({
    force: false,
  })
  .then(async () => {
    console.log("yes! sync done");
  });

module.exports = db;

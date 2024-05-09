const {
    Sequelize,
    DataTypes
} = require("sequelize");

const sequelize = new Sequelize(DBconfig.db, DBconfig.USER, DBconfig.PASS, {
    host: "localhost",
    dialect: "mysql",
    operatirAlias: false,
    loggin: false,
    port: 3306,
    pool: {
        max: 5,
        min: 0,
        accurate: 30000,
        idle: 10000
    }
})


sequelize.authenticate().then(() => {
    console.log("conected to database");
}).catch(err => {
    console.log("err" + err);
})

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// db.modelName = require("./path")(sequelize, DataTypes);


db.sequelize.sync({
    force: false,
}).then(async () => {
    console.log("yes! sync done");
})
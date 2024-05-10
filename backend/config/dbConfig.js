// require("dotenv").config();
// module.exports = {
//   HOST: process.env.HOST,
//   USER: process.env.USER,
//   PORT: process.env.DB_PORT,
//   PASSWORD: process.env.PASSWORD,
//   DB: process.env.DB,
//   dialect: "mysql",
//   pool: {
//     max: 5,
//     min: 0,
//     acquire: 30000,
//     idle: 10000,
//   },
// };
module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "",
  DB: "Home_Harmony",
  dialect: "mysql",
  operatoralias: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};

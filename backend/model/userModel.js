module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define("user", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'user'
    },
     phone: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  });
  Users.associate = (models) => {
    Users.hasMany(models.CartItem, {
      foreignKey: 'userId',
      as: 'cartItems'
    })
  }
  return Users;
};

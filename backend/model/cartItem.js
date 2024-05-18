module.exports = (sequelize, DataTypes) => {
  const CartItem = sequelize.define("CartItem", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    // Add userId field
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    // Add productId field if it's missing
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  CartItem.associate = (models) => {
    CartItem.belongsTo(models.User, {
      foreignKey: "userId",
      onDelete: "CASCADE",
    });
    CartItem.belongsTo(models.Product, {
      foreignKey: "productId",
      onDelete: "CASCADE",
    });
  };

  return CartItem;
};

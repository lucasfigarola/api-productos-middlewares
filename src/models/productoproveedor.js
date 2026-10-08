"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class ProductoProveedor extends Model {}

  ProductoProveedor.init(
    {
      productoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      proveedorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "ProductoProveedor",
      tableName: "ProductoProveedores",
    },
  );

  return ProductoProveedor;
};

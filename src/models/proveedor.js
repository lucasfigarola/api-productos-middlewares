"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Proveedor extends Model {
    static associate(models) {
      Proveedor.belongsToMany(models.Producto, {
        through: models.ProductoProveedor,
        foreignKey: "proveedorId",
        otherKey: "productoId",
        as: {
          singular: "producto",
          plural: "productos",
        },
      });
    }
  }

  Proveedor.init(
    {
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Proveedor",
      tableName: "Proveedores",
    },
  );

  return Proveedor;
};

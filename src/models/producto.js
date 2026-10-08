"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Producto extends Model {
    static associate(models) {
      Producto.belongsTo(models.Categoria, {
        foreignKey: "categoriaId",
        as: "categoria",
      });

      Producto.belongsToMany(models.Proveedor, {
        through: models.ProductoProveedor,
        foreignKey: "productoId",
        otherKey: "proveedorId",
        as: {
          singular: "proveedor",
          plural: "proveedores",
        },
      });
    }
  }

  Producto.init(
    {
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      precio: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      categoriaId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Producto",
      tableName: "Productos",
    },
  );

  return Producto;
};

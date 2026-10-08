"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Categoria extends Model {
    static associate(models) {
      Categoria.hasMany(models.Producto, {
        foreignKey: "categoriaId",
        as: "productos",
      });
    }
  }

  Categoria.init(
    {
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: "Categoria",
      tableName: "Categoria",
    },
  );

  return Categoria;
};

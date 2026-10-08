"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("ProductoProveedores", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      productoId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Productos",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      proveedorId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Proveedores",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    await queryInterface.addIndex(
      "ProductoProveedores",
      ["productoId", "proveedorId"],
      {
        unique: true,
        name: "producto_proveedor_unique",
      },
    );
  },

  async down(queryInterface) {
    await queryInterface.dropTable("ProductoProveedores");
  },
};

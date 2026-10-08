const { Categoria, Producto } = require("../models");

const obtenerCategorias = async (req, res) => {
  try {
    const categorias = await Categoria.findAll();
    res.status(200).json(categorias);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener las categorias" });
  }
};

const obtenerCategoria = async (req, res) => {
  try {
    const { id } = req.params;

    const categoria = await Categoria.findByPk(id, {
      include: {
        model: Producto,
        as: "productos",
        attributes: ["id", "nombre", "precio", "stock"],
      },
    });

    if (!categoria) {
      return res.status(404).json({ message: "Categoria no encontrada" });
    }

    res.status(200).json(categoria);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener la categoria" });
  }
};

const crearCategoria = async (req, res) => {
  try {
    const { nombre } = req.body;

    if (!nombre) {
      return res.status(400).json({ message: "El nombre es obligatorio" });
    }

    const categoria = await Categoria.create({ nombre });

    res.status(201).json({
      message: "Categoria creada con exito",
      categoria,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear la categoria" });
  }
};

module.exports = {
  obtenerCategorias,
  obtenerCategoria,
  crearCategoria,
};

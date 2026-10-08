const { Producto, Categoria, Proveedor } = require("../models");

const obtenerProductos = async (req, res) => {
  try {
    const productos = await Producto.findAll({
      attributes: ["id", "nombre", "precio", "stock"],
      include: [
        {
          model: Categoria,
          as: "categoria",
          attributes: ["nombre"],
        },
        {
          model: Proveedor,
          as: "proveedores",
          attributes: ["nombre"],
          through: { attributes: [] },
        },
      ],
    });

    res.status(200).json(productos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener los productos" });
  }
};

const obtenerProducto = async (req, res) => {
  res.status(200).json(req.producto);
};

const crearProducto = async (req, res) => {
  try {
    const { nombre, precio, stock, categoriaId } = req.body;

    if (categoriaId !== undefined && categoriaId !== null) {
      const categoria = await Categoria.findByPk(categoriaId);

      if (!categoria) {
        return res.status(404).json({ message: "Categoria no encontrada" });
      }
    }

    const producto = await Producto.create({
      nombre,
      precio,
      stock,
      categoriaId: categoriaId ?? null,
    });

    res.status(201).json({
      message: "Producto creado con exito",
      producto,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear el producto" });
  }
};

const actualizarProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, precio, stock, categoriaId } = req.body;

    const producto = await Producto.findByPk(id);

    if (!nombre || precio === undefined || stock === undefined) {
      return res.status(400).json({
        message: "nombre, precio y stock son obligatorios",
      });
    }

    if (categoriaId !== undefined && categoriaId !== null) {
      const categoria = await Categoria.findByPk(categoriaId);

      if (!categoria) {
        return res.status(404).json({
          message: "Categoria no encontrada",
        });
      }
    }

    await producto.update({
      nombre,
      precio,
      stock,
      categoriaId: categoriaId ?? null,
    });

    res.status(200).json({
      message: "Producto actualizado con exito",
      producto,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error al actualizar el producto",
    });
  }
};

const eliminarProducto = async (req, res) => {
  try {
    const { id } = req.params;

    const producto = await Producto.findByPk(id);

    if (!producto) {
      return res.status(404).json({
        message: "Producto no encontrado",
      });
    }

    await producto.destroy();

    res.status(200).json({
      message: "Producto eliminado con exito",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error al eliminar el producto",
    });
  }
};

const agregarProveedor = async (req, res) => {
  try {
    const { id, proveedorId } = req.params;

    const producto = await Producto.findByPk(id);
    if (!producto) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    const proveedor = await Proveedor.findByPk(proveedorId);
    if (!proveedor) {
      return res.status(404).json({ message: "Proveedor no encontrado" });
    }

    const yaAsociado = await producto.hasProveedor(proveedor);
    if (yaAsociado) {
      return res.status(400).json({
        message: "El proveedor ya esta asociado al producto",
      });
    }

    await producto.addProveedor(proveedor);

    res.status(200).json({
      message: "Proveedor asociado al producto correctamente",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al asociar el proveedor" });
  }
};

const quitarProveedor = async (req, res) => {
  try {
    const { id, proveedorId } = req.params;

    const producto = await Producto.findByPk(id);
    if (!producto) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    const proveedor = await Proveedor.findByPk(proveedorId);
    if (!proveedor) {
      return res.status(404).json({ message: "Proveedor no encontrado" });
    }

    const estaAsociado = await producto.hasProveedor(proveedor);
    if (!estaAsociado) {
      return res.status(404).json({
        message: "El proveedor no esta asociado al producto",
      });
    }

    await producto.removeProveedor(proveedor);

    res.status(200).json({
      message: "Proveedor desasociado del producto correctamente",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al desasociar el proveedor" });
  }
};

module.exports = {
  obtenerProductos,
  obtenerProducto,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
  agregarProveedor,
  quitarProveedor,
};

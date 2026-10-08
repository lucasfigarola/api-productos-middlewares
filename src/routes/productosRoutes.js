const { Router } = require("express");
const router = Router();
const productoController = require("../controllers/productosControllers");
const validarId = require("../middlewares/validarId");
const buscarProductoPorId = require("../middlewares/buscarProductoPorId");
const validarProducto = require("../middlewares/validarProducto");

router.get("/", productoController.obtenerProductos);
router.get(
  "/:id",
  validarId,
  buscarProductoPorId,
  productoController.obtenerProducto,
);
router.post("/", validarProducto, productoController.crearProducto);
router.put(
  "/:id",
  validarId,
  buscarProductoPorId,
  productoController.actualizarProducto,
);
router.delete(
  "/:id",
  validarId,
  buscarProductoPorId,
  productoController.eliminarProducto,
);

// Rutas de la relacion muchos a muchos Producto <-> Proveedor
router.post(
  "/:id/proveedores/:proveedorId",
  productoController.agregarProveedor,
);
router.delete(
  "/:id/proveedores/:proveedorId",
  productoController.quitarProveedor,
);

module.exports = router;

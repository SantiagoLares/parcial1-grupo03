import { Router } from "express";
import { CatalogoService } from "./catalogo.service.js";

export function createCatalogoRouter(catalogoService = new CatalogoService()): Router {
  const router = Router();

  // GET /productos
  router.get("/", (_req, res) => {
    const productos = catalogoService.obtenerTodos().map((prod) => ({
      id: prod.id,
      nombre: prod.nombre,
      precioBase: prod.precioBase,
      precioFinal: prod.calcularPrecio(),
    }));
    return res.status(200).json(productos);
  });

  // GET /productos/:id
  router.get("/:id", (req, res) => {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({ error: "El ID debe ser un número válido" });
    }

    const producto = catalogoService.obtenerPorId(id);

    if (!producto) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    return res.status(200).json({
      id: producto.id,
      nombre: producto.nombre,
      precioBase: producto.precioBase,
      precioFinal: producto.calcularPrecio(),
    });
  });

  return router;
}
import { Router } from "express";
import { PedidoService } from "../services/pedido.service.js";
import { PedidoRepository } from "../repositories/pedido.repository.js";
import { CatalogoService } from "../services/catalogo.service.js";

export function createPedidoRouter(
  servicio = new PedidoService(
    new CatalogoService(),
    new PedidoRepository()
  )
): Router {
  const router = Router();

  router.post("/", (req, res) => {
    try {
      const items = req.body?.items;

      if (!Array.isArray(items)) {
        return res.status(400).json({
          error: "Debe enviar una lista de items",
        });
      }

      const pedido = servicio.crearPedido(items);
      return res.status(201).json(pedido);
    } catch (error) {
      return res.status(400).json({
        error:
          error instanceof Error
            ? error.message
            : "Error al crear el pedido",
      });
    }
  });

  router.get("/", (_req, res) => {
    return res.status(200).json(servicio.listarPedidos());
  });

  router.get("/:id", (req, res) => {
    const pedido = servicio.buscarPorId(String(req.params.id));

    if (!pedido) {
      return res.status(404).json({
        error: "Pedido no encontrado",
      });
    }

    return res.status(200).json(pedido);
  });

  return router;
}

export default createPedidoRouter();
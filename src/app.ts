import express from "express";
import type { ErrorRequestHandler } from "express";
import { CatalogoService } from "./catalogo/catalogo.service.js";
import { createCatalogoRouter } from "./catalogo/catalogo.router.js";
import { PedidoRepository } from "./repositories/pedido.repository.js";
import { PedidoService } from "./services/pedido.service.js";
import { createPedidoRouter } from "./routers/pedido.router.js";
import { ReportesService } from "./reportes/reportes.service.js";
import { createReportesRouter } from "./reportes/reportes.router.js";

export function createApp() {
  const app = express();

  const catalogo = new CatalogoService();
  const repositorio = new PedidoRepository();
  const pedidos = new PedidoService(catalogo, repositorio);
  const reportes = new ReportesService(pedidos, catalogo);

  app.use(express.json());

  app.use("/productos", createCatalogoRouter(catalogo));
  app.use("/pedidos", createPedidoRouter(pedidos));
  app.use("/reportes", createReportesRouter(reportes));

  app.use((_req, res) => {
    res.status(404).json({ error: "Ruta no encontrada" });
  });

  const manejarErrores: ErrorRequestHandler = (
    error,
    _req,
    res,
    _next
  ) => {
    if (error instanceof SyntaxError && "body" in error) {
      res.status(400).json({ error: "JSON inválido" });
      return;
    }

    console.error(error);
    res.status(500).json({ error: "Error interno del servidor" });
  };

  app.use(manejarErrores);

  return app;
}
import { describe, it, expect } from "vitest";
import express from "express";
import request from "supertest";
import { createCatalogoRouter } from "../routers/catalogo.router.js";
import { CatalogoService } from "../services/catalogo.service.js";

describe("Rutas de catálogo (/productos)", () => {
  // Instanciamos una app de Express aislada para los tests del router
  const app = express();
  app.use(express.json());
  app.use("/productos", createCatalogoRouter(new CatalogoService()));

  it("GET /productos devuelve status 200 y la lista de 20 productos", async () => {
    const res = await request(app).get("/productos");

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body).toHaveLength(20);
    expect(res.body[0]).toHaveProperty("precioFinal");
  });

  it("GET /productos/:id devuelve status 200 y el producto solicitado", async () => {
    const res = await request(app).get("/productos/2");

    expect(res.status).toBe(200);
    expect(res.body.id).toBe(2);
    expect(res.body.nombre).toBe("Expreso Colombia pocillo");
    expect(res.body.precioFinal).toBe(5740);
  });

  it("GET /productos/:id devuelve status 404 para un ID inexistente", async () => {
    const res = await request(app).get("/productos/999");

    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("error");
    expect(res.body.error).toBe("Producto no encontrado");
  });

  it("GET /productos/:id devuelve status 400 si el ID no es numérico", async () => {
    const res = await request(app).get("/productos/invalido");

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error");
  });
});
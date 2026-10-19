import { beforeEach, describe, expect, it } from "vitest";
import request from "supertest";
import { createApp } from "../app.js";

describe("Integración de la API", () => {
  let app: ReturnType<typeof createApp>;

  beforeEach(() => {
    app = createApp();
  });

  it("crea pedidos y refleja las ventas en los reportes", async () => {
    const catalogo = await request(app)
      .get("/productos")
      .expect(200);

    expect(catalogo.body.length).toBeGreaterThanOrEqual(2);

    const [primero, segundo] = catalogo.body;

    const consulta = await request(app)
      .get(`/productos/${primero.id}`)
      .expect(200);

    expect(consulta.body).toEqual(primero);

    const totalEsperado =
      primero.precioFinal * 2 + segundo.precioFinal;

    const creacion = await request(app)
      .post("/pedidos")
      .send({
        items: [
          { productoId: primero.id, cantidad: 2 },
          { productoId: segundo.id, cantidad: 1 },
        ],
      })
      .expect(201);

    expect(creacion.body.total).toBe(totalEsperado);
    expect(creacion.body.estado).toBe("pendiente");

    const pedido = await request(app)
      .get(`/pedidos/${creacion.body.id}`)
      .expect(200);

    expect(pedido.body).toEqual(creacion.body);

    const listado = await request(app)
      .get("/pedidos")
      .expect(200);

    expect(listado.body).toEqual([creacion.body]);

    await request(app)
      .post("/pedidos")
      .send({
        items: [{ productoId: primero.id, cantidad: 3 }],
      })
      .expect(201);

    const facturacion = await request(app)
      .get("/reportes/facturacion")
      .expect(200);

    expect(facturacion.body).toEqual({
      facturacion: totalEsperado + primero.precioFinal * 3,
    });

    const vendidos = await request(app)
      .get("/reportes/mas-vendidos")
      .expect(200);

    expect(vendidos.body).toEqual([
      {
        productoId: primero.id,
        nombre: primero.nombre,
        cantidad: 5,
      },
    ]);
  });

  it("devuelve reportes vacíos cuando no hay pedidos", async () => {
    const facturacion = await request(app)
      .get("/reportes/facturacion")
      .expect(200);

    expect(facturacion.body).toEqual({ facturacion: 0 });

    const vendidos = await request(app)
      .get("/reportes/mas-vendidos")
      .expect(200);

    expect(vendidos.body).toEqual([]);
  });

  it("rechaza un pedido vacío sin registrar ventas", async () => {
    const respuesta = await request(app)
      .post("/pedidos")
      .send({ items: [] })
      .expect(400);

    expect(respuesta.body.error).toEqual(expect.any(String));

    const pedidos = await request(app)
      .get("/pedidos")
      .expect(200);

    expect(pedidos.body).toEqual([]);

    const facturacion = await request(app)
      .get("/reportes/facturacion")
      .expect(200);

    expect(facturacion.body).toEqual({ facturacion: 0 });
  });

  it("rechaza JSON inválido con una respuesta JSON", async () => {
    const respuesta = await request(app)
      .post("/pedidos")
      .set("Content-Type", "application/json")
      .send('{"items":')
      .expect(400);

    expect(respuesta.body).toEqual({ error: "JSON inválido" });
  });

  it("responde 404 al consultar un pedido inexistente", async () => {
    const respuesta = await request(app)
      .get("/pedidos/no-existe")
      .expect(404);

    expect(respuesta.body).toEqual({
      error: "Pedido no encontrado",
    });
  });

  it("responde en JSON ante una ruta inexistente", async () => {
    const respuesta = await request(app)
      .get("/ruta-inexistente")
      .expect(404);

    expect(respuesta.body).toEqual({
      error: "Ruta no encontrada",
    });
  });
});
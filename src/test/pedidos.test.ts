import { describe, it, expect, beforeEach, vi } from "vitest";
import {PedidoRepository} from "./pedido.repository";
import { PedidoService } from "./pedido.service";

// Productos simulados para no depender del integrante 1 y 2.
const productos = [
  {
    id: "1",
    nombre: "Muffin de chocolate",
    calcularPrecio: () => 2500,
  },
  {
    id: "2",
    nombre: "Expreso Brasil pocillo",
    calcularPrecio: () => 5020,
  },
];

const catalogo = {
  buscarPorId: vi.fn((id: string) =>
    productos.find((producto) => producto.id === id)
  ),
};

describe("PedidoService", () => {
  let servicio: PedidoService;
  let repositorio: PedidoRepository;

  beforeEach(() => {
    catalogo.buscarPorId.mockClear();
    repositorio = new PedidoRepository();
    servicio = new PedidoService(catalogo, repositorio);
  });

  describe("Crear pedidos", () => {
    it("calcula el total de un pedido con varios productos", () => {
      const pedido = servicio.crearPedido([
        { productoId: "1", cantidad: 2 },
        { productoId: "2", cantidad: 1 },
      ]);

      expect(pedido.total).toBe(10020);
    });

    it("multiplica el precio por la cantidad", () => {
      const pedido = servicio.crearPedido([
        { productoId: "1", cantidad: 3 },
      ]);

      expect(pedido.total).toBe(7500);
    });

    it("rechaza un pedido vacío", () => {
      expect(() => servicio.crearPedido([])).toThrow();
    });

    it("rechaza un producto inexistente", () => {
      expect(() =>
        servicio.crearPedido([
          { productoId: "999", cantidad: 1 },
        ])
      ).toThrow();
    });
  });

  describe("Validar cantidades", () => {
    it.each([0, -1, 1.5, NaN])(
      "rechaza la cantidad inválida %s",
      (cantidad) => {
        expect(() =>
          servicio.crearPedido([
            { productoId: "1", cantidad },
          ])
        ).toThrow();
      }
    );
  });

  describe("Consultar pedidos", () => {
    it("lista todos los pedidos creados", () => {
      servicio.crearPedido([
        { productoId: "1", cantidad: 1 },
      ]);

      servicio.crearPedido([
        { productoId: "2", cantidad: 1 },
      ]);

      expect(servicio.listarPedidos()).toHaveLength(2);
    });

    it("busca un pedido existente por ID", () => {
      const creado = servicio.crearPedido([
        { productoId: "1", cantidad: 1 },
      ]);

      expect(servicio.buscarPorId(creado.id)).toEqual(creado);
    });

    it("devuelve un resultado vacío si el pedido no existe", () => {
      expect(servicio.buscarPorId("inexistente")).toBeUndefined();
    });
  });
});

import { describe, it, expect } from "vitest";
import { CatalogoService } from "./catalogo.service.js";

describe("CatalogoService", () => {
  const service = new CatalogoService();

  it("devuelve la lista completa de 20 productos", () => {
    const productos = service.obtenerTodos();
    expect(productos).toHaveLength(20);
  });

  it("encuentra un producto existente por su ID", () => {
    const producto = service.obtenerPorId(2);
    expect(producto).toBeDefined();
    expect(producto?.nombre).toBe("Expreso Colombia pocillo");
    expect(producto?.calcularPrecio()).toBe(5740);
  });

  it("encuentra un producto de pastelería correctamente", () => {
    const muffin = service.obtenerPorId(19);
    expect(muffin).toBeDefined();
    expect(muffin?.nombre).toBe("Muffin de chocolate");
    expect(muffin?.calcularPrecio()).toBe(2500);
  });

  it("devuelve undefined cuando el ID no existe en el catálogo", () => {
    const producto = service.obtenerPorId(999);
    expect(producto).toBeUndefined();
  });
});
import type { Producto } from "../models/productos/index.js";
import { PRODUCTOS_INICIALES } from "../data/productos.data.js";

export class CatalogoService {
  private productos: Map<number, Producto>;

  constructor(productosIniciales: Producto[] = PRODUCTOS_INICIALES) {
    this.productos = new Map(productosIniciales.map((p) => [p.id, p]));
  }

  obtenerTodos(): Producto[] {
    return Array.from(this.productos.values());
  }

  obtenerPorId(id: number): Producto | undefined {
    return this.productos.get(id);
  }
}
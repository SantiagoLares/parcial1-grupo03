import { Producto } from "./producto.js";
import type { Tamanio } from "./tamanio.js";
import type { VariedadCafe } from "./variedad-cafe.js";

export abstract class Cafe extends Producto {
    protected abstract readonly gramosPorTamanio: Record<Tamanio, number>;

    constructor(
        id: number,
        nombre: string,
        precioBase: number,
        public readonly variedad: VariedadCafe,
        public readonly tamanio: Tamanio,
    ) {
        super(id, nombre, precioBase);
    }

    calcularPrecio(): number {
        const gramos = this.gramosPorTamanio[this.tamanio];
        return this.precioBase + gramos * this.variedad.precioPorGramo;
    }
}
import { Cafe } from "./cafe.js";
import type { Tamanio } from "./tamanio.js";
import type { VariedadCafe } from "./variedad-cafe.js";

export class Filtrado extends Cafe {
    protected readonly gramosPorTamanio: Record<Tamanio, number> = {
        pocillo: 6,
        mediano: 15,
        grande: 25,
    };

    constructor(id: number, variedad: VariedadCafe, tamanio: Tamanio) {
        super(id, `Filtrado ${variedad.origen} ${tamanio}`, 3200, variedad, tamanio);
    }
}
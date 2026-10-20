import { Cafe } from "./cafe.js";
import type { Tamanio } from "./tamanio.js";
import type { VariedadCafe } from "./variedad-cafe.js";

export class Expreso extends Cafe {
    protected readonly gramosPorTamanio: Record<Tamanio, number> = {
        pocillo: 18,
        mediano: 27,
        grande: 36,
    };

    constructor(id: number, variedad: VariedadCafe, tamanio: Tamanio) {
        super(id, `Expreso ${variedad.origen} ${tamanio}`, 2500, variedad, tamanio);
    }
}
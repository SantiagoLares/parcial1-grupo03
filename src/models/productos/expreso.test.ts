import { describe, it, expect } from "vitest";
import { Expreso } from "./expreso.js";
import type { Tamanio } from "./tamanio.js";
import { BRASIL, COLOMBIA, ETIOPIA } from "./variedad-cafe.js";
import type { VariedadCafe } from "./variedad-cafe.js";

describe("Expreso", () => {
    it.each<[VariedadCafe, Tamanio, number]>([
        [BRASIL, "pocillo", 5020],
        [BRASIL, "mediano", 6280],
        [BRASIL, "grande", 7540],
        [COLOMBIA, "pocillo", 5740],
        [COLOMBIA, "mediano", 7360],
        [COLOMBIA, "grande", 8980],
        [ETIOPIA, "pocillo", 6820],
        [ETIOPIA, "mediano", 8980],
        [ETIOPIA, "grande", 11140],
    ])("%o %s cuesta %i", (variedad, tamanio, esperado) => {
        const expreso = new Expreso(1, variedad, tamanio);
        expect(expreso.calcularPrecio()).toBe(esperado);
    });

    it("tiene precio base 2500 y nombre descriptivo", () => {
        const expreso = new Expreso(1, COLOMBIA, "mediano");
        expect(expreso.precioBase).toBe(2500);
        expect(expreso.nombre).toBe("Expreso Colombia mediano");
    });
});
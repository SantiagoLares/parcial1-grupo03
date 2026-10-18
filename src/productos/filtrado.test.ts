import { describe, it, expect } from "vitest";
import { Filtrado } from "./filtrado";
import type { Tamanio } from "./tamanio.js";
import type { BRASIL, COLOMBIA, ETIOPIA, VariedadCafe } from "./variedad-cafe.js";

describe("Filtrado", () => {
    it.each<[VariedadCafe, Tamanio, number]>([
        [BRASIL, "pocillo", 4040],
        [BRASIL, "mediano", 5300],
        [BRASIL, "grande", 6700],
        [COLOMBIA, "pocillo", 4280],
        [COLOMBIA, "mediano", 5900],
        [COLOMBIA, "grande", 7700],
        [ETIOPIA, "pocillo", 4640],
        [ETIOPIA, "mediano", 6800],
        [ETIOPIA, "grande", 9200],
    ])("%o %s cuesta %i", (variedad, tamanio, esperado) => {
        const filtrado = new Filtrado(1, variedad, tamanio);
        expect(filtrado.calcularPrecio()).toBe(esperado);
    });

    it("tiene precio base 3200 y nombre descriptivo", () => {
        const filtrado = new Filtrado(1, ETIOPIA, "grande");
        expect(filtrado.precioBase).toBe(3200);
        expect(filtrado.nombre).toBe("Filtrado Etiopía grande");
    });
});
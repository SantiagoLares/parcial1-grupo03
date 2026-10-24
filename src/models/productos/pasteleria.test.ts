import { describe, it, expect } from "vitest";
import { Pasteleria } from "./pasteleria.js";

describe("Pasteleria", () => {
    it("el muffin de chocolate cuesta 2500", () => {
        const muffin = new Pasteleria(19, "Muffin de chocolate", 2500);
        expect(muffin.calcularPrecio()).toBe(2500);
    });

    it("la porción de torta selva negra cuesta 4200", () => {
        const torta = new Pasteleria(20, "Porción de torta selva negra", 4200);
        expect(torta.calcularPrecio()).toBe(4200);
    });

    it("conserva id, nombre y precioBase", () => {
        const muffin = new Pasteleria(19, "Muffin de chocolate", 2500);
        expect(muffin.id).toBe(19);
        expect(muffin.nombre).toBe("Muffin de chocolate");
        expect(muffin.precioBase).toBe(2500);
    });
});
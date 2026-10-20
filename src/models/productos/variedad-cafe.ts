export type Origen = "Colombia" | "Etiopía" | "Brasil";

export interface VariedadCafe {
    origen: Origen;
    precioPorGramo: number;
    acidez: string;
    cuerpo: string;
    notas: string;
}

export const COLOMBIA: VariedadCafe = {
    origen: "Colombia",
    precioPorGramo: 180,
    acidez: "media",
    cuerpo: "equilibrado",
    notas: "cítricas y florales",
};

export const ETIOPIA: VariedadCafe = {
    origen: "Etiopía",
    precioPorGramo: 240,
    acidez: "muy viva",
    cuerpo: "ligero",
    notas: "frutales",
};

export const BRASIL: VariedadCafe = {
    origen: "Brasil",
    precioPorGramo: 140,
    acidez: "baja",
    cuerpo: "denso",
    notas: "avellana",
};
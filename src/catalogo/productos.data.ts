import {
  Expreso,
  Filtrado,
  Pasteleria,
  BRASIL,
  COLOMBIA,
  ETIOPIA,
  type Producto,
} from "../productos/index.js";

// Lista con las 9 combinaciones de Expreso, 9 de Filtrado y 2 de Pasteleria.
export const PRODUCTOS_INICIALES: Producto[] = [
  // Expreso (IDs 1 al 9)
  new Expreso(1, BRASIL, "pocillo"),
  new Expreso(2, COLOMBIA, "pocillo"),
  new Expreso(3, ETIOPIA, "pocillo"),
  new Expreso(4, BRASIL, "mediano"),
  new Expreso(5, COLOMBIA, "mediano"),
  new Expreso(6, ETIOPIA, "mediano"),
  new Expreso(7, BRASIL, "grande"),
  new Expreso(8, COLOMBIA, "grande"),
  new Expreso(9, ETIOPIA, "grande"),

  // Filtrado (IDs 10 al 18)
  new Filtrado(10, BRASIL, "pocillo"),
  new Filtrado(11, COLOMBIA, "pocillo"),
  new Filtrado(12, ETIOPIA, "pocillo"),
  new Filtrado(13, BRASIL, "mediano"),
  new Filtrado(14, COLOMBIA, "mediano"),
  new Filtrado(15, ETIOPIA, "mediano"),
  new Filtrado(16, BRASIL, "grande"),
  new Filtrado(17, COLOMBIA, "grande"),
  new Filtrado(18, ETIOPIA, "grande"),

  // Pasteleria (IDs 19 y 20)
  new Pasteleria(19, "Muffin de chocolate", 2500),
  new Pasteleria(20, "Porción de torta selva negra", 4200),
];
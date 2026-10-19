# parcial1-grupo03

# Cafetería Origen — Grupo 03

API para consultar productos, gestionar pedidos y obtener reportes de ventas.

## Tecnologías

- Node.js 24
- TypeScript
- Express
- Vitest y Supertest
- Almacenamiento en memoria

## Instalación

```bash
git clone https://github.com/SantiagoLares/parcial1-grupo03.git
cd parcial1-grupo03
npm ci
```

## Ejecución

Durante el desarrollo:

```bash
npm run dev
```

Compilar y ejecutar:

```bash
npm run build
npm start
```

El servidor utiliza http://localhost:3000 por defecto.
El puerto puede configurarse mediante la variable de entorno PORT.

## Tests

```bash
npm test
```

Incluye pruebas de productos, catálogo, pedidos, reportes e integración HTTP.

## Endpoints

| Método | Ruta | Descripción |
|---|---|---|
| GET | /productos | Lista el catálogo con precios |
| GET | /productos/:id | Consulta un producto |
| POST | /pedidos | Crea un pedido y calcula su total |
| GET | /pedidos | Lista los pedidos |
| GET | /pedidos/:id | Consulta un pedido |
| GET | /reportes/facturacion | Devuelve la facturación total |
| GET | /reportes/mas-vendidos | Devuelve los productos más vendidos |

## Ejemplo de pedido

Enviar a POST /pedidos con Content-Type: application/json:

```json
{
  "items": [
    { "productoId": 1, "cantidad": 2 }
  ]
}
```

El total se calcula usando el precio de cada producto por su cantidad.
Los pedidos se crean con estado pendiente.
En caso de empate, el reporte devuelve todos los productos más vendidos.

## Organización

- productos: modelos y cálculo de precios.
- catalogo: catálogo en memoria y rutas de productos.
- models, repositories, services y routers: gestión de pedidos.
- reportes: cálculos y rutas de reportes.
- app.ts: conecta los módulos usando servicios compartidos.
- server.ts: inicia el servidor.
- test/integracion.test.ts: comprueba el flujo completo de la API.

Cada aplicación usa un repositorio de pedidos compartido entre pedidos y reportes.
Los datos se pierden al reiniciar el servidor.
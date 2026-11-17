# SINOVA Frontend – Módulo de empleados (GA7-220501096-AA4-EV03)

Frontend en **React + Vite** del módulo de empleados de **SINOVA (Sistema de Liquidación de Nómina)**. Consume la API REST [sinova-api](https://github.com/wmatiz-art/sinova-api) (Spring Boot + MySQL).

## Arquitectura
React (Vite, puerto 5173) → API REST Spring Boot (puerto 8080) → MySQL (base `sinova`)

## Funcionalidades
- Listado de empleados con paginación (5 por página)
- Búsqueda por número de documento
- Perfil del empleado
- Registro y edición en ventana modal, con los errores de validación de la API debajo de cada campo
- Eliminación con confirmación

## Estructura
```
src/
├── components/   Navbar, Footer, EncabezadoSeccion, BuscadorEmpleado, Mensaje,
│                 TablaEmpleados, Paginacion, Modal, FormularioEmpleado,
│                 DetalleEmpleado, DialogoConfirmacion
├── pages/        EmpleadosPage (estado y lógica del CRUD)
├── services/     EmpleadoService.js (peticiones con Axios)
├── styles/       sinova.css (paleta SINOVA sobre Bootstrap)
├── App.jsx
└── main.jsx
```

## Ejecución
1. Ejecutar el backend `sinova-api` (NetBeans, Run File sobre `SinovaApiApplication`) en `http://localhost:8080`.
2. En esta carpeta:
```
npm install
npm run dev
```
3. Abrir `http://localhost:5173`

Tecnologías: React · Vite · Axios · Bootstrap 5 · Bootstrap Icons

Autor: Wilmar Andrés Matiz Rodas – Ficha 3336196 – SENA

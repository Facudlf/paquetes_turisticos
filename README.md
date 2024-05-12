## Guía Interactiva de Paquetes de Viajes - Ejercitación de Desarrollo de Software

### Objetivo

Esta ejercitación busca que los estudiantes demuestren su habilidad para integrar y completar código en una aplicación web que utiliza tecnologías de frontend y backend. La aplicación mostrará una lista de paquetes de viajes con detalles como destino (país), duración, precio, y descripción. Se podrá filtrar la lista por país y buscar por palabra clave en la descripción.

### Descripción de la Ejercitación

Los estudiantes recibirán un código base para una aplicación web que incluye componentes de frontend y backend. Deberán completar ciertas funciones para que la aplicación funcione correctamente. El frontend debe usar HTML y JavaScript para mostrar una lista de paquetes de viajes con opciones de filtrado y búsqueda. El backend, desarrollado con Node.js, servirá estos paquetes desde una base de datos (la elección de la base de datos queda a criterio del estudiante).

### Requisitos del Backend

*   Implementar una ruta GET para recuperar todos los paquetes de viajes.
*   Implementar una ruta GET para filtrar paquetes por destino (país) usando parámetros de ruta (ej: `/paquetes/:pais`).
*   Implementar una ruta GET para buscar paquetes por descripción usando query strings (ej: `/paquetes/consulta?q=aventura`).

### Requisitos del Frontend

*   Completar la función para cargar la grilla con todos los paquetes de viajes al iniciar la aplicación.
*   Implementar las funciones para filtrar la grilla por país y buscar por palabra clave.
*   Crear un formulario para agregar un nuevo paquete de viajes al final de la grilla.
*   Agregar un botón de eliminar en cada fila de la grilla para eliminar el paquete correspondiente.

### Ejemplos de Rutas

*   Obtener todos los paquetes: `GET /paquetes`
*   Filtrar por país (ej: Argentina): `GET /paquetes/Argentina` El filtro debe buscar los que contengan la palabra 
*   Buscar por descripción (ej: playa): `GET /paquetes?q=playa`
*   Eliminar un paquete por id (ej: playa): `DELETE /paquetes/1`
*   Cargar un nuevo paquete: `POST /paquetes`

### Instrucciones

1.  **Configuración del Backend:** Se proporcionará el código base para la aplicación Node.js. Los estudiantes deben completar la implementación de las rutas mencionadas en los requisitos del backend. 
2.  **Configuración del Frontend:** Se proporcionará un archivo HTML básico y el código JavaScript inicial. Los estudiantes deben completar las funciones para cargar, filtrar, buscar y manipular la grilla de paquetes de viajes, como se describe en los requisitos del frontend.

### Criterios de Evaluación

*   **Funcionalidad:** La aplicación funciona como se describe, completando correctamente las partes del código requeridas.
*   **Calidad del Código:** El código es limpio, bien organizado y adecuadamente comentado.
*   **Diseño:** El frontend muestra los paquetes de viajes de manera clara y organizada, con opciones de filtrado y búsqueda fáciles de usar.
*   **Manejo de Errores:** La aplicación maneja posibles errores de forma adecuada, tanto en el backend como en el frontend.

### Pruebas y Ejecución

Las instrucciones para ejecutar la aplicación dependerán del framework y herramientas elegidas. Se espera que los estudiantes sean capaces de configurar y ejecutar la aplicación para demostrar su funcionamiento.
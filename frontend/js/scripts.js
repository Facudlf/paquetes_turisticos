const apiUrl = 'http://localhost:3000/paquetes'; // Reemplaza con la URL de tu API

// Función para cargar la grilla de paquetes
function cargarPaquetes() {
   // Obtener el elemento de la lista de paquetes turísticos
   let listaPaquetesTuristico = document.getElementById('lista-paquetes');
   // Limpiar la lista antes de agregar nuevos paquetes
   listaPaquetesTuristico.innerHTML = '';
   // Realizar una solicitud fetch al apiUrl para obtener los paquetes
   fetch(apiUrl)
      .then((respuesta) => { return respuesta.json() }) // Convertir la respuesta a JSON
      .then((paquetes) => {
         // Iterar sobre cada paquete recibido
         paquetes.forEach(paquete => {
            // Crear una fila para cada paquete
            const row = document.createElement('tr');
            // Rellenar la fila con los datos del paquete
            row.innerHTML = 
            `<td>${paquete.destino}</td>
             <td>${paquete.duracion}</td>
             <td>${paquete.precio}</td>
             <td>${paquete.descripcion}</td>
             <td>
                 <button class="btn btn-danger btn-sm" onclick="eliminarPaquete(${paquete.id})">Eliminar</button>
             </td>`;
            // Agregar la fila a la lista de paquetes
            listaPaquetesTuristico.appendChild(row);
         });
      });
}


// Función para buscar paquetes por descripción
function buscarPaquetes() {
   // Obtener el valor de búsqueda del input
   const query = document.getElementById('buscar-input').value;
   // Construir la URL de la API, agregando el parámetro de consulta si hay una búsqueda
   let url = apiUrl;
   if (query) {
      url += `/consulta?q=${query}`;
   }
   // Realizar una solicitud fetch a la URL construida
   fetch(url)
      .then((respuesta) => { return respuesta.json() }) // Convertir la respuesta a JSON
      .then((paquetes) => {
         // Actualizar la grilla con los resultados de la búsqueda
         const listaPaquetes = document.getElementById('lista-paquetes');
         listaPaquetes.innerHTML = ''; // Limpiar la lista antes de agregar los nuevos resultados
         // Iterar sobre los paquetes recibidos y agregarlos a la lista
         paquetes.forEach(paquete => {
            const row = document.createElement('tr');
            row.innerHTML = 
              `<td>${paquete.destino}</td>
               <td>${paquete.duracion}</td>
               <td>${paquete.precio}</td>
               <td>${paquete.descripcion}</td>
               <td>
                  <button class="btn btn-danger btn-sm" onclick="eliminarPaquete(${paquete.id})">Eliminar</button>
               </td>`;
            listaPaquetes.appendChild(row);
         });
      });
}

// Función para agregar un nuevo paquete
function agregarPaquete() {
   // Obtener los valores del nuevo paquete desde los campos de entrada
   const nuevoPaquete = {
      destino: document.getElementById('destino-input').value,
      duracion: document.getElementById('duracion-input').value,
      precio: parseFloat(document.getElementById('precio-input').value),
      descripcion: document.getElementById('descripcion-input').value
   };
   // Realizar una solicitud fetch para agregar el nuevo paquete a la API
   fetch(apiUrl, {
      method: 'POST', // Utilizar el método POST para crear un nuevo recurso
      headers: {
         'Content-Type': 'application/json' // Indicar que el cuerpo de la solicitud es JSON
      },
      body: JSON.stringify(nuevoPaquete) // Convertir el objeto nuevoPaquete a JSON y enviarlo en el cuerpo de la solicitud
   }).then((response) => {
      if (response.ok) {
         // Si la respuesta es exitosa (código de estado 200-299), limpiar los campos de entrada y recargar la lista de paquetes
         document.getElementById('destino-input').value = "";
         document.getElementById('duracion-input').value = "";
         document.getElementById('precio-input').value = "";
         document.getElementById('descripcion-input').value = "";
         cargarPaquetes(); // Recargar la lista de paquetes para reflejar el cambio
      } else {
         // Si hay algún error en la respuesta, mostrar un mensaje de alerta
         alert('Error al crear el paquete');
      }
   });
}


// Función para eliminar un paquete
function eliminarPaquete(id) {
   // Confirmar si el usuario está seguro de eliminar el paquete
   if (confirm('¿Estás seguro de que quieres eliminar este paquete?')) {
      // Realizar una solicitud fetch para eliminar el paquete con el ID proporcionado
      fetch(`${apiUrl}/${id}`, {
         method: 'DELETE' // Utilizar el método DELETE para eliminar el recurso
      }).then((response) => {
         if (response.ok) {
            // Si la respuesta es exitosa (código de estado 200-299), recargar la lista de paquetes para reflejar el cambio
            cargarPaquetes();
         } else {
            // Si hay algún error en la respuesta, mostrar un mensaje de alerta
            alert('Error al eliminar el paquete');
         }
      });
   }
}


// Cargar la lista de paquetes al cargar la página
cargarPaquetes();
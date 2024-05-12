const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const cors = require('cors');

// Configura la aplicación Express
const app = express();
app.use(express.json());
app.use(cors()); 

// Configura la conexión Sequelize (base de datos SQLite en memoria)
const sequelize = new Sequelize('sqlite::memory:');

// Define el modelo Paquete
const Paquete = sequelize.define('Paquete', {
    destino: DataTypes.STRING,
    duracion: DataTypes.STRING,
    precio: DataTypes.FLOAT,
    descripcion: DataTypes.TEXT
}, { timestamps: false });

// Inicializa la base de datos e inserta datos de muestra
async function inicializarBaseDeDatos() {
    await sequelize.sync({ force: true });
    await Paquete.bulkCreate([
        { destino: 'Cancún, México', duracion: '7 días', precio: 1200, descripcion: 'Disfruta de playas paradisíacas y ruinas mayas.' },
        { destino: 'Machu Picchu, Perú', duracion: '5 días', precio: 850, descripcion: 'Explora la ciudad perdida de los Incas en los Andes.' },
        { destino: 'Roma, Italia', duracion: '10 días', precio: 1500, descripcion: 'Descubre la historia y cultura de la antigua Roma.' },
        { destino: 'París, Francia', duracion: '5 días', precio: 1300, descripcion: 'Romance y cultura en la ciudad de la luz.' },
        { destino: 'Tokio, Japón', duracion: '8 días', precio: 2100, descripcion: 'Experimenta la mezcla de tradición y modernidad.' },
        { destino: 'Nueva York, USA', duracion: '6 días', precio: 1700, descripcion: 'La ciudad que nunca duerme.' },
        { destino: 'Londres, Inglaterra', duracion: '7 días', precio: 1450, descripcion: 'Historia y cultura en la capital británica.' },
        { destino: 'Río de Janeiro, Brasil', duracion: '5 días', precio: 900, descripcion: 'Playas, carnaval y el Cristo Redentor.' },
        { destino: 'Buenos Aires, Argentina', duracion: '4 días', precio: 550, descripcion: 'Tango, gastronomía y cultura porteña.' },
        { destino: 'Madrid, España', duracion: '6 días', precio: 1100, descripcion: 'Arte, historia y vida nocturna.' }, 
    ]);
}

// Endpoint para buscar paquetes por descripción
app.get('/paquetes/consulta', async (req, res) => {
    // Obtenemos el parámetro de consulta de la URL
    const query = req.query.q;
    // Imprimimos la consulta en la consola con fines de depuración
    console.log(query);
    if (query) { // Si se proporcionó una consulta
        // Buscamos paquetes que coincidan con la descripción proporcionada
        const paquetes = await Paquete.findAll({
            where: {
                descripcion: {
                    [Sequelize.Op.like]: `%${query}%` // Utilizamos una comparación "LIKE" para buscar descripciones que contengan la consulta
                }
            }
        });
        // Respondemos con los paquetes encontrados
        res.json(paquetes);
    } else { // Si no se proporcionó una consulta
        // Obtenemos todos los paquetes sin ningún filtro
        const paquetes = await Paquete.findAll();
        // Respondemos con todos los paquetes
        res.json(paquetes);
    }
});

// Endpoint para obtener todos los paquetes
app.get('/paquetes', async (req, res) => {
    // Obtenemos todos los paquetes sin ningún filtro
    const paquetes = await Paquete.findAll();
    // Respondemos con todos los paquetes
    res.json(paquetes);
});

// Endpoint para filtrar paquetes por país
app.get('/paquetes/:pais', async (req, res) => {
    // Obtenemos el parámetro de país de la URL
    const pais = req.params.pais;
    // Buscamos paquetes cuyo destino coincida con el país proporcionado
    const paquetes = await Paquete.findAll({
        where: {
            destino: {
                [Sequelize.Op.like]: `%${pais}%` // Utilizamos una comparación "LIKE" para buscar destinos que contengan el país
            }
        }
    });
    // Respondemos con los paquetes encontrados
    res.json(paquetes);
});

// Endpoint para crear un nuevo paquete (POST)
app.post('/paquetes', async (req, res) => {
    // Obtenemos los datos del nuevo paquete del cuerpo de la solicitud
    const nuevoPaquete = req.body;
    try {
        // Creamos el nuevo paquete en la base de datos
        const paqueteCreado = await Paquete.create(nuevoPaquete);
        // Respondemos con el paquete recién creado y un código de estado 201 (Creado)
        res.status(201).json(paqueteCreado);
    } catch (error) {
        // Si hay un error al crear el paquete, respondemos con un código de estado 400 (Solicitud incorrecta)
        res.status(400).json({ error: 'Error al crear el paquete' });
    }
});

// Endpoint para eliminar un paquete (DELETE)
app.delete('/paquetes/:id', async (req, res) => {
    // Obtenemos el ID del paquete a eliminar de los parámetros de la URL
    const id = req.params.id;
    try {
        // Intentamos eliminar el paquete de la base de datos
        const paqueteEliminado = await Paquete.destroy({ where: { id } });
        if (paqueteEliminado) { // Si se eliminó correctamente el paquete
            // Respondemos con un código de estado 204 (Sin contenido) ya que no hay contenido que enviar
            res.status(204).send();
        } else { // Si no se encontró el paquete con el ID proporcionado
            // Respondemos con un código de estado 404 (No encontrado) y un mensaje de error
            res.status(404).json({ error: 'Paquete no encontrado' });
        }
    } catch (error) {
        // Si hay un error al eliminar el paquete, respondemos con un código de estado 500 (Error interno del servidor)
        res.status(500).json({ error: 'Error al eliminar el paquete' }); 
    }
});

// Inicia el servidor
inicializarBaseDeDatos().then(() => {
    // Escuchamos en el puerto 3000 y mostramos un mensaje en la consola cuando el servidor esté listo
    app.listen(3000, () => console.log('Servidor corriendo en http://localhost:3000'));
});

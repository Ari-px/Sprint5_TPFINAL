import express from 'express';
import {connectDB} from './config/dbConfig.mjs';
import methodOverride from 'method-override';

import paisesRoutes from './routes/paisesRoutes.mjs';

import expressLayouts from 'express-ejs-layouts';

//para renderizar las vistas
import path from 'path';
import { fileURLToPath } from 'url';

// MODIFICACIÓN 1: Se importa el controlador para consumir la API externa
import {
    renderizarLandingPage, 
    renderizarAbout,
    consumirAPIExternaDePaisesController // <-- AGREGADO
} from './controllers/paisesController.mjs';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON
app.use(express.json());
//Middleware para trabajar con el enctype application/x-www-form-urlencoded por defecto del form
app.use(express.urlencoded({ extended: true }));

/* Sobreescribir peticiones con ej: ?_method=DELETE */
app.use(methodOverride('_method'));

//Conexión a MongoDB
connectDB();

/*
*Configurarción del motor de vistas
*/

//ruta absoluta del archivo app.mjs
const __filename = fileURLToPath(import.meta.url);
//console.log("filename: ", __filename)

//directorio en que se encuentra el archivo app.mjs
const __dirname = path.dirname(__filename);
//console.log("dirname: ", __dirname);

//establece la ruta a carpeta views
app.set('views', path.join(__dirname, 'views')); 
app.set('view engine', 'ejs');

//configurar express-ejs-layouts
app.use(expressLayouts);
app.set('layout', 'layout') //archivo base de layout

/*-------------------------------- */

//servir archivos estaticos
//console.log(path.join(__dirname, 'public'));
app.use(express.static(path.join(__dirname, 'public')));

/*-------------------------------- */

//pagina de incio
app.get('/', renderizarLandingPage);

//Acerca de
app.get('/acerca', renderizarAbout);

// MODIFICACIÓN 2: Se define la ruta para la carga inicial de datos (Seeder)
app.get('/externa/datos', consumirAPIExternaDePaisesController); // <-- AGREGADO

//configuración de rutas
app.use('/api', paisesRoutes);

//Iniciar el servidor
app.listen(PORT, ()=> {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
})
import express from 'express';
import {connectDB} from './config/dbConfig.mjs';
import methodOverride from 'method-override';
import superHeroRoutes from './routes/superHeroRoutes.mjs';

// === 1. IMPORTAR EJS LAYOUTS ===
import expressLayouts from 'express-ejs-layouts'; 

//para renderizar las vistas
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON
app.use(express.json());
//Middleware para trabajar con el enctype application/x-www-form-urlencoded por defecto del form
app.use(express.urlencoded({ extended: true }));

// Sobreescribir peticiones con ej: ?_method=DELETE
app.use(methodOverride('_method'));

//Conexión a MongoDB
connectDB();

//Configurarción del motor de vistas

//ruta absoluta del archivo app.mjs
const __filename = fileURLToPath(import.meta.url);
//directorio en que se encuentra el archivo app.mjs
const __dirname = path.dirname(__filename);

// ----------------------------------------------------------------------
// === CORRECCIÓN CLAVE: USAR RUTA ABSOLUTA PARA ARCHIVOS ESTÁTICOS ===
// Esto garantiza que Express encuentre la carpeta 'public' en cualquier entorno.
app.use(express.static(path.join(__dirname, 'public'))); 
// ----------------------------------------------------------------------

//establece la ruta a carpeta views
app.set('views', path.join(__dirname, 'views')); 
app.set('view engine', 'ejs');

// === 3. CONFIGURACIÓN EJS LAYOUTS ===
app.use(expressLayouts);
// Especifica el archivo de layout principal que envolverá todas las vistas
app.set('layout', path.join(__dirname, 'views/layouts/layout')); 
// Permite que los scripts/styles en las vistas se muevan a <head> o final del <body> del layout
app.set('layout extractScripts', true);
app.set('layout extractStyles', true);

// === RUTAS PARA VISTAS (Página Principal, Lista, Agregar) ===

app.get('/', (req, res) => {
    res.render('index', { pageTitle: 'Página Principal' });
});

app.get('/superheroes', (req, res) => {
    res.render('list', { pageTitle: 'Lista de Superhéroes', heroes: [] });
});

app.get('/agregar', (req, res) => {
    res.render('add', { pageTitle: 'Agregar Superhéroe', error: null, oldData: {} });
});

// Implementación de validación para la prueba
app.post('/agregar', (req, res) => {
    const { nombre, editorial } = req.body;
    
    if (!nombre || !editorial) {
        // Falló la validación: renderiza la vista de nuevo con mensaje de error
        return res.render('add', { 
            pageTitle: 'Agregar Superhéroe',
            error: '¡Atención! El nombre y la editorial son obligatorios.',
            oldData: req.body 
        });
    }
    // Lógica para guardar el héroe en la BD...
    console.log(`Héroe agregado: ${nombre}`);
    res.redirect('/superheroes');
});


// === CONFIGURACIÓN DE RUTAS API ===
app.use('/api', superHeroRoutes);

//Manejo de errores para rutas no encontradas
app.use((req, res)=>{
    res.status(404).send({
        mensaje: 'Ruta no encontrada'
    })
});

//Iniciar el servidor
app.listen(PORT, ()=> {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
})
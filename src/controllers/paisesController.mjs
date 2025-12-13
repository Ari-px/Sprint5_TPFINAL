import { validationResult } from 'express-validator';
import {
    consumirApiExternaDePaises,
    registrarPaisesAPI,
    obtenerTodosLosPaises,
    obtenerPaisPorId,
    crearNuevoPais,
    actualizarPais,
    eliminarPaisPorID
} from '../services/paisesService.mjs';
import { mapearPaises } from '../models/mapearDatosApi.mjs';
import { renderizarPaises } from '../views/responsiveView.mjs';

// Constante para el alumno (más limpio que repetirlo)
const ALUMNO_CREADOR = "ESPECHE ARIANA DE JESÚS";

/* =========================================
   Vistas Estáticas
   ========================================= */
export const renderizarLandingPage = (req, res) => {
    res.render('home', { titulo: "Países de Hispanoamérica" });
}

export const renderizarAbout = (req, res) => {
    res.render('about', { titulo: "Acerca De" });
}

/* =========================================
   Lógica de API Externa
   ========================================= */
export const consumirAPIExternaDePaisesController = async (req, res) => {
    try {
        console.log("🔄 Consumiendo API externa...");
        const listaDePaises = await consumirApiExternaDePaises();
        
        // Filtrar los que incluyen 'spa' en languages
        const listaFiltrada = listaDePaises.filter(pais => pais.languages && 'spa' in pais.languages);
        
        // Mapear a nuestro formato
        const listaFormateada = mapearPaises(listaFiltrada);

        // Registrar en la BD
        const paisesRegistrados = await registrarPaisesAPI(listaFormateada);
        
        res.status(200).json({
            mensaje: "Países cargados exitosamente",
            cantidad: paisesRegistrados.length,
            datos: paisesRegistrados
        });
    } catch (error) {
        res.status(500).send({
            mensaje: 'Error al consumir API',
            error: error.message
        });
    }
}

/* =========================================
   Dashboard (Leer)
   ========================================= */
export const obtenerTodosLosPaisesController = async (req, res) => {
    try {
        const paises = await obtenerTodosLosPaises();
        // IMPORTANTE: Aquí podrías filtrar por ALUMNO_CREADOR si fuera necesario visualmente
        const paisesFormateados = renderizarPaises(paises);

        res.render('dashboard', { 
            titulo: 'Listado de Países', 
            paises: paisesFormateados 
        });
    } catch (error) {
        res.status(500).render('error', { 
            titulo: 'Error',
            mensaje: 'Error al obtener los países: ' + error.message 
        });
    }
}

/* =========================================
   Crear País
   ========================================= */
export const renderizarFormCrearNuevoPaiController = (req, res) => {
    res.render('addPais', { 
        titulo: 'Nuevo País', 
        camposErroneos: [], 
        mensajesDeError: [],
        valoresRetornados: {} // Objeto vacío para el primer render
    });
}

export const crearNuevoPaisController = async (req, res) => {
    try {
        // 1. Verificar errores de validación (express-validator)
        const errors = validationResult(req);

        // 2. Si hay errores, volvemos a mostrar el form con los mensajes y los datos previos
        if (!errors.isEmpty()) {
            return res.render('addPais', {
                titulo: 'Nuevo País',
                camposErroneos: errors.array(), // Lista de errores
                mensajesDeError: errors.array().map(e => e.msg),
                valoresRetornados: req.body // ¡Mantiene lo que el usuario escribió!
            });
        }

        // 3. Preparar objeto
        const datos = req.body;
        const datosPais = {
            nombreComun: datos.nombreComunPais,
            nombreOficial: datos.nombreOficialPais,
            capital: datos.capitalPais, // Asegúrate que venga como array o string según tu modelo
            fronteras: datos.paisesFrontera,
            area: datos.areaPais,
            poblacion: datos.poblacionPais,
            timezones: datos.timezones ? datos.timezones : [],
            creador: ALUMNO_CREADOR
        };

        await crearNuevoPais(datosPais);
        
        res.redirect('/api/paises');

    } catch(error){
        res.status(500).send({
            mensaje: 'Error interno al crear país',
            error: error.message
        });
    }
}

/* =========================================
   Editar País
   ========================================= */
export const renderizarFormEditarPaisController = async (req, res) => {
    try {
        const { id } = req.params;
        const pais = await obtenerPaisPorId(id); 

        if(!pais){
            return res.status(404).send({mensaje: 'País no encontrado'});
        }    

        res.render('editPais', { 
            valoresRetornados: pais, 
            titulo: 'Editar País', 
            camposErroneos: [], 
            mensajesDeError: []
        });
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al buscar país', error: error.message });
    }
}

export const actualizarPaisController = async (req, res) => {
    try {
        const { id } = req.params;

        // 1. Validación de errores
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // Si falla, renderizamos editPais de nuevo
            // IMPORTANTE: Pasamos el ID y los datos del body para no perder lo escrito
            const paisConDatosErroneos = { _id: id, ...req.body };
            return res.render('editPais', {
                titulo: 'Editar País',
                valoresRetornados: paisConDatosErroneos,
                camposErroneos: errors.array(),
                mensajesDeError: errors.array().map(e => e.msg)
            });
        }

        // 2. Actualizar
        const datos = req.body;
        const datosPais = {
            nombreComun: datos.nombreComunPais,
            nombreOficial: datos.nombreOficialPais,
            capital: datos.capitalPais,
            fronteras: datos.paisesFrontera,
            area: datos.areaPais,
            poblacion: datos.poblacionPais,
            timezones: datos.timezones ? datos.timezones : [],
        };

        const paisActualizado = await actualizarPais(id, datosPais);

        if(!paisActualizado){
            return res.status(404).send({mensaje: 'País no encontrado para actualizar'});
        }  

        res.redirect('/api/paises');

    } catch (error) {
        res.status(500).send({
            mensaje: 'Error al actualizar el país',
            error: error.message
        });
    }
}  

/* =========================================
   Eliminar País
   ========================================= */
export const eliminarPaisPorIDController = async (req, res) => {
    try {
        const { id } = req.params;
        const paisEliminado = await eliminarPaisPorID(id);

        if(!paisEliminado){
            return res.status(404).send({mensaje: 'País no encontrado para eliminar'});
        }  
        
        console.log(`🗑️ País eliminado: ${id}`);
        res.redirect('/api/paises');

    } catch (error) {
        res.status(500).send({
            mensaje: 'Error al eliminar el país',
            error: error.message
        });
    }
}
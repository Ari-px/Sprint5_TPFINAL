import { validationResult } from 'express-validator';

/**
 * Middleware genérico para manejar errores de express-validator en formularios de Creación (addPais).
 * Si hay errores, renderiza la vista 'addPais' con los datos y mensajes de error.
 */
export const controlDeErroresCreación = (req, res, next) => {
    // console.log("Middleware: Manejando errores de Creación"); // Limpiamos logs

    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        const camposErroneos = errors.array().map(error => error.path);
        const mensajesDeError = errors.array().map(error => error.msg);

        // Devolvemos el formulario 'addPais' con los errores y los datos ingresados
        return res.render('addPais', {
            titulo: 'Nuevo País', 
            camposErroneos, 
            mensajesDeError, 
            valoresRetornados: req.body // Mantiene los datos que el usuario ingresó
        });
        
    } else {
        // No hay errores, pasa al siguiente middleware/controlador
        next();
    }
}


/**
 * Middleware genérico para manejar errores de express-validator en formularios de Edición (editPais).
 * Si hay errores, renderiza la vista 'editPais' con los datos, el ID y los mensajes de error.
 */
export const controlDeErroresEdición = (req, res, next) => {
    // console.log("Middleware: Manejando errores de Edición"); // Limpiamos logs

    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        const { id } = req.params; // Capturamos el ID
        const camposErroneos = errors.array().map(error => error.path);
        const mensajesDeError = errors.array().map(error => error.msg);

        // Al editar, necesitamos el ID para que el formulario sepa a dónde enviar el PUT/PATCH.
        // Combinamos el ID con el cuerpo de la solicitud para formar el objeto 'valoresRetornados'.
        const valoresRetornadosConId = {
            _id: id,
            ...req.body
        };

        return res.render('editPais', {
            titulo: 'Editar País', 
            camposErroneos, 
            mensajesDeError, 
            valoresRetornados: valoresRetornadosConId // ¡Importante: incluye el ID!
        });
        
    } else {
        // No hay errores, pasa al siguiente middleware/controlador
        next();
    }
}

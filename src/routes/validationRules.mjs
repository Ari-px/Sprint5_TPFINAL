import { body } from 'express-validator';

// Constantes para mensajes de error, para evitar repetir strings largos
const MSG_RANGO_3_90 = 'El campo debe ser texto y tener entre 3 y 90 caracteres.';
const MSG_OBLIGATORIO = 'Este campo es obligatorio.';
const MSG_FRONTERA_FORMATO = 'Cada país fronterizo debe ser un código de 3 letras mayúsculas (ej: ARG).';
const MSG_FRONTERA_REQUERIDO = 'Debe agregar por lo menos un país frontera.';

export const paisValidator = [
    
    // ----------------------------------------------------
    // 1. Nombre Común
    // ----------------------------------------------------
    body('nombreComunPais')
        .trim() // Limpia espacios iniciales/finales
        .notEmpty().withMessage('El nombre común del país es obligatorio.')
        .isString().withMessage('El nombre común debe ser texto.')
        .isLength({ min: 3, max: 90 }).withMessage(MSG_RANGO_3_90)
        .escape(),

    // ----------------------------------------------------
    // 2. Nombre Oficial
    // ----------------------------------------------------
    body('nombreOficialPais')
        .trim()
        .notEmpty().withMessage('El nombre oficial del país es obligatorio.')
        .isString().withMessage('El nombre oficial debe ser texto.')
        .isLength({ min: 3, max: 90 }).withMessage(MSG_RANGO_3_90)
        .escape(),

    // ----------------------------------------------------
    // 3. Capital (asumiendo input de formulario como string único)
    // ----------------------------------------------------
    body('capitalPais')
        .trim()
        .notEmpty().withMessage('La capital del país es obligatoria.')
        .isString().withMessage('La capital debe ser texto.')
        .isLength({ min: 3, max: 90 }).withMessage(MSG_RANGO_3_90)
        .escape(),
        
    // ----------------------------------------------------
    // 4. Área
    // ----------------------------------------------------
    body('areaPais')
        .trim()
        .notEmpty().withMessage('El área es obligatoria.')
        .isNumeric().withMessage('El área debe ser un valor numérico.')
        .custom(value => parseFloat(value) >= 0) // Verifica que sea no negativo
        .withMessage('El área debe ser un número no negativo.')
        .escape(),

    // ----------------------------------------------------
    // 5. Población
    // ----------------------------------------------------
    body('poblacionPais')
        .trim()
        .notEmpty().withMessage('La población es obligatoria.')
        .isNumeric().withMessage('La población debe ser un número.')
        .isInt({ min: 0 }).withMessage('La población debe ser un número entero no negativo.'), // Verifica entero y no negativo
        // isInt({min: 0}) ya cubre ambas necesidades.

    // ----------------------------------------------------
    // 6. Fronteras (Requisito de Array Mínimo)
    // ----------------------------------------------------
    body('paisesFrontera')
        .exists({checkFalsy: true}).withMessage(MSG_FRONTERA_REQUERIDO)
        .isArray({min: 1}).withMessage(MSG_FRONTERA_REQUERIDO),

    // ----------------------------------------------------
    // 7. Fronteras (Elementos del Array)
    // ----------------------------------------------------
    body('paisesFrontera.*')
        .trim()
        .notEmpty().withMessage('Un código fronterizo no puede estar vacío.')
        .matches(/^[A-Z]{3}$/) // <-- ¡Mejora clave! Verifica 3 letras mayúsculas exactas
        .withMessage(MSG_FRONTERA_FORMATO)
        .escape(),
        
    // ----------------------------------------------------
    // 8. Timezones (Validación opcional si existe)
    // ----------------------------------------------------
    body('timezones.*') // Aplica validación solo si se envía el campo
        .optional()
        .trim()
        .notEmpty().withMessage('Un timezone no puede estar vacío.')
        .isString()
        .escape()
];
import mongoose from "mongoose";

// Esquema pais
const paisSchema = new mongoose.Schema({
    nombreComun: {
        type: String,
        trim: true, // Elimina espacios en blanco al inicio y final
        minlength: [3, 'Nombre común debe tener al menos 3 caracteres'],
        maxlength: [90, 'Nombre común no puede exceder 90 caracteres']
    },
    nombreOficial: {
        type: String,
        required: [true, 'El nombre oficial es obligatorio'],
        trim: true,
        minlength: [3, 'Nombre oficial debe tener al menos 3 caracteres'], // [cite: 54]
        maxlength: [90, 'Nombre oficial no puede exceder 90 caracteres']
    },
    capital: {
        type: [String], // Cambiado a Array según API y PDF (validar cada elemento)
        required: [true, 'La capital es obligatoria'],
        validate: {
            // Valida que CADA capital tenga entre 3 y 90 caracteres 
            validator: function(v) {
                return v && v.length > 0 && v.every(c => c.length >= 3 && c.length <= 90);
            },
            message: 'Cada capital debe tener entre 3 y 90 caracteres y no puede estar vacía'
        }
    },
    fronteras: {
        type: [String],
        validate: {
            // Valida que cada código tenga exactamente 3 letras mayúsculas 
            validator: function(v) {
                if (!v) return true; // Permitir array vacío si no tiene fronteras
                return v.every(codigo => /^[A-Z]{3}$/.test(codigo));
            },
            message: 'Cada código de frontera debe ser de 3 letras mayúsculas (ej: ARG)'
        }
    },
    area: {
        type: Number,
        min: [0, 'El área debe ser un número positivo'] // [cite: 57]
    },
    poblacion: {
        type: Number,
        min: [0, 'La población debe ser un entero positivo'], // [cite: 58]
        validate: {
            validator: Number.isInteger,
            message: 'La población debe ser un número entero'
        }
    },
    gini: {
        type: Number,
        min: [0, 'El índice Gini debe ser mínimo 0'], // 
        max: [100, 'El índice Gini debe ser máximo 100']
    },
    timezones: [String],
    creador: {
        type: String,
        required: [true, 'El creador es obligatorio para identificar al alumno'],
        trim: true
    },
    createdAt: { type: Date, default: Date.now }
});

// Modelo pais: Nombre modelo, esquema, colección
// IMPORTANTE: Asegúrate de que 'Grupo-20' sea la colección correcta de tu equipo
const Pais = mongoose.model('Pais', paisSchema, 'Grupo-20');

export default Pais;
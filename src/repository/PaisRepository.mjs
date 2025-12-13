// Importar el modelo de País
import Pais from '../models/Pais.mjs'; 
// Importar abstracción de los metodos CRUD
import IRepository from './IRepository.mjs';

// ** CONSTANTE CRUCIAL **
// Asegúrate de que este nombre coincida con el que usas en el Controlador y en el script de Seed.
const ALUMNO_CREADOR = "ESPECHE ARIANA DE JESÚS"; 

// Clase PaisRepository que hereda de IRepository
class PaisRepository extends IRepository {
    
    // R - Leer por ID
    async obtenerPaisPorId(id){
        return await Pais.findById(id);
    }

    // R - Leer todos (filtrando por creador y por tipo de documento)
    async obtenerTodosLosPaises(){
        // Filtra por el creador actual (requisito 9) y asegura que tenga 'capital' 
        // (para excluir documentos de 'superhéroes' si siguen en la misma colección)
        return await Pais.find({
            creador: ALUMNO_CREADOR,
            capital: {$exists: true} 
        }); 
    }

    // C - Carga masiva (Seeding/API)
    async registrarPaisesAPI(listadoPaises){
        // Usamos insertMany para eficiencia en inserción de arrays
        return await Pais.insertMany(listadoPaises);
    }

    // C - Crear uno nuevo desde el formulario
    async crearNuevoPais(datosPais) {
        // Usamos spread operator para un código más limpio y escalable
        return await Pais.create({
            ...datosPais,
            creador: ALUMNO_CREADOR // Aseguramos que se guarde con el nombre correcto
        });
    }

    // U - Actualizar
    async actualizarPais(id, datosPais) {
        // findByIdAndUpdate realiza la búsqueda y actualización en una sola operación.
        // { new: true } es crucial para que devuelva el documento actualizado y no el antiguo.
        return await Pais.findByIdAndUpdate(
            id, 
            { $set: datosPais }, 
            { new: true, runValidators: true } // runValidators: true asegura que las validaciones del Schema se ejecuten al actualizar.
        );
    }

    // D - Eliminar
    async eliminarPaisPorID(id){
        return await Pais.findByIdAndDelete(id);
    }
}

export default new PaisRepository();
class IRepository {
    obtenerPaisPorId(id) {
        throw new Error("Método 'obtenerPaisPorID()' no implementado");
    }
    obtenerTodosLosPaises() {
        throw new Error("Método 'obtenerTodosLosPaises()' no implementado");
    }

    //DRegistros que vienen de la API
    registrarPaisesAPI(listadoPaises){
        throw new Error("Método 'registrarPaisesAPI()' no implementado");
    }

    crearNuevoPais(datosPais){
        throw new Error("Método 'crearNuevoSuperHeroe()' no implementado");
    }

    actualizarPais(id, datosPais){
        throw new Error("Método 'actualizarSuperHeroe()' no implementado");
    }

    eliminarPaisPorID(id){
        throw new Error("Método 'eliminarSuperHeroePorID()' no implementado");
    }
}

export default IRepository;
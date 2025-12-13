/**
 * Lógica de confirmación para la eliminación de múltiples países en el Dashboard.
 */

// Usamos DOMContentLoaded para asegurar que el script se ejecuta después de que
// todos los elementos HTML han sido cargados (es más rápido que 'load').
document.addEventListener("DOMContentLoaded", ()=>{
    
    // Captura TODOS los formularios de eliminación que tengan la clase 'delete-form'
    const formsDelete = document.querySelectorAll(".delete-form");
    
    // (Opcional) Verifica en la consola cuántos formularios encontró
    console.log(`Formularios de eliminación encontrados: ${formsDelete.length}`);

    // Iteramos sobre CADA formulario encontrado para añadir el listener
    formsDelete.forEach(formDelete => {
        
        // confirmación sobre envío de datos
        formDelete.addEventListener("submit", (event)=> {
            
            // Muestra la ventana de confirmación
            let confirmacion = window.confirm("¿Está seguro/a de que deseas eliminar el país?");
            
            console.log(confirmacion);
            
            if(!confirmacion){
                // Si el usuario presiona Cancelar, previene el envío del formulario
                event.preventDefault();
            }
        });
    });

    // Nota: El código relacionado con agregar fronteras/timezones NO DEBE estar aquí, 
    // ya que no existe en el Dashboard, solo en el formulario de edición/agregar.
});
window.addEventListener("load", () => {
    // 1. Constantes y Selectores
    // Usamos constantes para los IDs para evitar "magic strings" y mejorar legibilidad.
    const FRONTERA = {
        INPUT_ID: '#idPaisFrontera',
        CONTAINER_ID: '#paisesFronteraContainer',
        INPUT_NAME: 'paisesFrontera[]',
        MIN_LENGTH: 3,
        MAX_LENGTH: 3
    };

    const TIMEZONE = {
        INPUT_ID: '#idTimezone',
        CONTAINER_ID: '#timezonesContainer',
        INPUT_NAME: 'timezones[]',
        MIN_LENGTH: 3,
        MAX_LENGTH: 30 // Aumenté el max length para timezones, ya que son más largos
    };

    const btnAgregarPaisFrontera = document.querySelector("#btnAgregarPaisFrontera");
    const btnAgregarTimezone = document.querySelector("#btnAgregarTimezone");

    // 2. Función Central Mejorada y Estructurada
    /**
     * Agrega un nuevo input a un contenedor dinámico.
     * @param {Object} config - Objeto de configuración (FRONTERA o TIMEZONE).
     */
    const agregarInputVector = (config) => {
        const inputParaAgregar = document.querySelector(config.INPUT_ID);
        const contenedor = document.querySelector(config.CONTAINER_ID);
        const valor = inputParaAgregar.value.trim();

        // 2.1. Validación simple en Cliente (Mejora: evita agregar valores vacíos)
        if (!valor || valor.length < config.MIN_LENGTH || valor.length > config.MAX_LENGTH) {
            // Podrías agregar feedback visual aquí (ej. borde rojo)
            console.warn(`El valor es inválido o vacío. Debe tener entre ${config.MIN_LENGTH} y ${config.MAX_LENGTH} caracteres.`);
            inputParaAgregar.value = ''; // Limpiar campo si es inválido
            return;
        }

        // 2.2. Crear Div Contenedor (para el input y el botón)
        const div = document.createElement('div');
        // Usamos una clase CSS específica para el par input-botón
        div.className = "input-group-item"; 

        // 2.3. Crear Input del elemento agregado
        const input = document.createElement('input');
        input.type = 'text';
        input.name = config.INPUT_NAME;
        input.value = valor;
        input.className = "inputVector dynamic-input";
        
        // Asignamos las validaciones de longitud (aunque el backend es el principal)
        input.minLength = config.MIN_LENGTH;
        input.maxLength = config.MAX_LENGTH;

        // Opcional: Impedir edición directa para mantener la integridad de lo agregado
        input.readOnly = true; 
        
        // 2.4. Crear Botón Quitar
        const btnQuitar = document.createElement('button');
        btnQuitar.innerText = 'Quitar';
        btnQuitar.type = 'button';
        btnQuitar.className = "btnQuitar dynamic-remove-btn";

        // 2.5. Ensamblar y Limpiar
        div.appendChild(input);
        div.appendChild(btnQuitar);
        contenedor.appendChild(div);

        inputParaAgregar.value = ''; // Limpia el input principal

        // 2.6. Event Listener para Quitar
        btnQuitar.addEventListener('click', () => {
            // Usamos remove() directamente, es más limpio que buscar el padre.
            div.remove();
            console.log(`Elemento ${valor} quitado.`);
        });

        console.log(`✅ Elemento '${valor}' agregado a ${config.INPUT_NAME}`);
    };

    // 3. Asignación de Event Listeners
    // Usamos la función mejorada con las constantes definidas
    if (btnAgregarPaisFrontera) {
        btnAgregarPaisFrontera.addEventListener('click', () => {
            agregarInputVector(FRONTERA);
        });
    }

    if (btnAgregarTimezone) {
        btnAgregarTimezone.addEventListener('click', () => {
            agregarInputVector(TIMEZONE);
        });
    }

    // Opcional: Esto ya no es necesario si la función es robusta
    // window.addEventListener('load', ...
    // ya nos aseguramos de que los botones existan con el "if"
});
import express from 'express';

import {consumirAPIExternaDePaisesController, obtenerTodosLosPaisesController,
    renderizarFormCrearNuevoPaiController, crearNuevoPaisController, renderizarFormEditarPaisController,
    actualizarPaisController, eliminarPaisPorIDController
} from '../controllers/paisesController.mjs';

import {paisValidator} from '../routes/validationRules.mjs';
import {
  creationValidationHandler,
  updateValidationHandler
} from '../routes/errorHandler.mjs';

const router = express.Router();

router.get('/paises/', obtenerTodosLosPaisesController);
//crear país
router.get('/paises/agregar', renderizarFormCrearNuevoPaiController);
router.post('/paises/agregar', paisValidator, creationValidationHandler, crearNuevoPaisController);

//editar país
router.get('/paises/:id/editar', renderizarFormEditarPaisController);
router.put('/paises/:id/editar', paisValidator, updateValidationHandler, actualizarPaisController);
//eliminar país
router.delete('/paises/:id/', eliminarPaisPorIDController);

//Consumir la API
router.get('/externa/datos', consumirAPIExternaDePaisesController);



export default router;
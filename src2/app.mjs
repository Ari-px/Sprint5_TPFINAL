import express from 'express';
import { connectDB } from './config/dbConfig.mjs';
import superheroesRouter from './routes/superHeroRoutes.mjs';

const app = express();
app.use(express.json());

// Conectar base de datos
connectDB();

// Rutas
app.use('/superheroes', superheroesRouter);

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en puerto ${PORT}`));

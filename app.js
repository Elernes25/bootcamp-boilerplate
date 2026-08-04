require('dotenv').config();
const path = require('path');
const dotenv = require('dotenv');

// Si DATABASE_URL no está definida, intentar cargar el .env del directorio principal del proyecto
if (!process.env.DATABASE_URL) {
    dotenv.config({ path: path.resolve(__dirname, '..', '..', '.env') });
    console.log('📄 Variables de entorno cargadas desde el directorio principal del proyecto');
}

const express = require('express');
const connectDB = require('./src/config/database');

const auditoriaMiddleware = require('./src/middlewares/auditoria.middleware');
const rutaNoEncontrada = require('./src/middlewares/errorHandler.middleware');

const pacientesRoutes = require('./src/routes/paciente.routes');
const turnosRoutes = require('./src/routes/turnos.routes');
const historiaClinicaRoutes = require('./src/routes/historiaClinica.routes');

const app = express();

app.use(express.json());
app.use(auditoriaMiddleware);

app.use('/api/v1/pacientes', pacientesRoutes);
app.use('/api/v1/turnos', turnosRoutes);
app.use('/api/v1/historias-clinicas', historiaClinicaRoutes);

// Ruta no encontrada (404)
app.use(rutaNoEncontrada);

connectDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`===============================================`);
    console.log(`============SERVIDOR MUNICIPAL ACTIVO==========`);
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
    console.log(`Entorno: ${process.env.ENTORNO || 'Local'} `);
    console.log(`Rutas de historias clínicas: /api/v1/historias-clinicas`);
    console.log(`===============================================`);
});


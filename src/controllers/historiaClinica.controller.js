const HistoriaClinica = require('../models/HistorialClinica');
const Paciente = require('../models/Paciente');
const respuestaEstandar = require('../utils/respuestaEstandar');

const createHistoriaClinica = async (req, res) => {
    try {
        const { paciente, fecha, motivoConsulta, diagnostico, tratamiento, medico } = req.body;

        const existePaciente = await Paciente.findById(paciente);
        if (!existePaciente) {
            return respuestaEstandar(res, 404, false, 'No se encontró el paciente especificado para asociar la historia clínica.');
        }

        const nuevaHistoria = new HistoriaClinica({
            paciente,
            fecha: fecha || Date.now(),
            motivoConsulta,
            diagnostico,
            tratamiento,
            medico
        });

        const historiaGuardada = await nuevaHistoria.save();

        return respuestaEstandar(res, 201, true, 'Registro de Historia Clínica creado con éxito', historiaGuardada);

    } catch (error) {
        if (error.name === 'ValidationError') {
            const errores = Object.values(error.errors).map(err => err.message);
            return respuestaEstandar(res, 400, false, 'Error de validación', errores);
        }

        return respuestaEstandar(res, 500, false, 'Error en el servidor al registrar la historia clínica', error.message);
    }
};

const getHistoriasClinicas = async (req, res) => {
    try {
        // .populate() para traer los datos clave del paciente asociado
        const historias = await HistoriaClinica.find()
            .populate('paciente', 'nombre dni email obraSocial')
            .sort({ fecha: -1 });

        return respuestaEstandar(res, 200, true, 'Historiales clínicos obtenidos exitosamente', historias);
    } catch (error) {
        return respuestaEstandar(res, 500, false, 'Error al obtener los registros clínicos', error.message);
    }
};

const getHistoriaClinicaByPaciente = async (req, res) => {
    try {
        const { pacienteId } = req.params;

        const historial = await HistoriaClinica.find({ paciente: pacienteId })
            .populate('paciente', 'nombre dni email')
            .sort({ fecha: -1 });

        return respuestaEstandar(res, 200, true, 'Historial del paciente obtenido exitosamente', historial);
    } catch (error) {
        return respuestaEstandar(res, 500, false, 'Error al obtener el historial del paciente', error.message);
    }
};

module.exports = {
    createHistoriaClinica,
    getHistoriasClinicas,
    getHistoriaClinicaByPaciente
};

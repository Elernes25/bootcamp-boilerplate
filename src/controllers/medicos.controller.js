const Medico = require('../models/Medico.js');
const respuestaEstandar = require('../utils/respuestaEstandar.js');

const getMedicos = async (req, res) => {
     try {
         const { dni } = req.query;
         const filtro = {};
        if (dni) {
             filtro.dni = dni;
         }
         console.log("🟢 Filtro armado:", filtro);
         const medicos = await Medico.find(filtro);
         return respuestaEstandar(res, 200, true, 'Medicos obtenidos exitosamente', medicos);

     } catch (error) {
         return respuestaEstandar(res, 500, false, 'Error al obtener los medicos', error.message);
     }
 };

const createMedico = async (req, res) => {
    try {
        const nuevoMedico = await Medico.create(req.body);
        return respuestaEstandar(res, 201, true, 'Medico creado exitosamente', nuevoMedico);
    } catch (error) {
        if (error.name === 'ValidationError') {
            const errores = Object.values(error.errors).map(err => err.message);

            return respuestaEstandar(res, 400, false, 'Error de validación', errores);
        }
        return respuestaEstandar(res, 500, false, 'Error al crear el médico', error.message);
    }
};

const deleteMedico = async (req, res)=>{
    try {
        const { id } = req.params;
        const brrMedico = await Medico.findByIdAndDelete(id);
        if (!brrMedico) {
            return respuestaEstandar(res, 404, false, 'Medico no encontrado');
        }
        return respuestaEstandar(res, 200, true, 'Medico eliminado correctamente', brrMedico);
    } catch (error) {
       
        return respuestaEstandar(res, 400 , false, 'Error al eliminar el medico', error.message);
    }
};
module.exports = {
    getMedicos,
    createMedico,
    deleteMedico
};
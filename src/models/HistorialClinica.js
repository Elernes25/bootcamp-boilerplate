const mongoose = require('mongoose');

const historialClinicaSchema = new mongoose.Schema({
    paciente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Paciente',
        required: [true, 'El paciente es obligatorio'],
    },
    fecha: {
        type: Date,
        required: [true, 'La fecha es obligatoria']         
    },
    motivoConsulta: {
        type: String,
        required: [true, 'El motivo de la consulta es obligatorio'] 
    },
    diagnostico: {
        type: String,
        required: [true, 'El diagnóstico es obligatorio']
    },
    tratamiento: {
        type: String,
        required: [true, 'El tratamiento es obligatorio']
    },
    medico: {
        type: String,
        required: [true, 'El nombre del médico es obligatorio'] 
    }
}, {
    timestamps: true
}); 

// Transformación del objeto a JSON
historialClinicaSchema.set('toJSON', {
    transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    }
});

module.exports = mongoose.model('HistoriaClinica', historialClinicaSchema);

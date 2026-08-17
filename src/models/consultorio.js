const mongoose = require('mongoose');

consultorioSchema = new mongoose.Schema({
    consultorioN:{ 
        type: String,
        required: [true,'El numero de consultorio es obligatorio'],
        match: [/^\d+$/, 'El identificador de consultorio debe ser numerico'],
        unique: [true, 'El número de consultorio ya existe']
    },
    /*pregunta: ¿el consultorio es fijo por especialidad o depende del medico cuya especialidad
    esta atendiendo en ese consultorio en ese momento? */
    /*el medico podria tener mas de una especialidad, en ese caso si
    tal vez convenga guardar la especialidad actual del medico*/

  //  especialidad: {
  //      type: mongoose.Schema.Types.ObjectId,   // referencia a un ID de Mongo
  //      ref: "Especialidad"                        // nombre del modelo relacionado
  //  },
    /* */

    medico: {
        type: mongoose.Schema.Types.ObjectId,   // referencia a un ID de Mongo
        ref: "Medico"                        // nombre del modelo relacionado
    },
    
    disponible: {
        type: Boolean,
        default: true,
    },
},

{timesstamps: true},
);

especialidadSchema.set('toJSON', {
    transform: (documento, especialidadRetorno) => {
        especialidadRetorno.id = especialidadRetorno._id;
        delete especialidadRetorno._id;
        delete especialidadRetorno.__v;
        delete especialidadRetorno.createdAt; /*borra los campos agregados por el timestamps */
        delete especialidadRetorno.updatedAt;
    }
}
);

module.exports = mongoose.model("Consultorio", especialidadSchema)
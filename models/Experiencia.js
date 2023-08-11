import {Schema, model, models} from "mongoose"

const ExperienciaSchema = new Schema({

    dono: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true        
    },
    empresa: {
        type: String,
        required: true   
    },
    cargo: {
        type: String,
        required: true
    },
    mesInicio: {
        type: String
    },
    mesFim: {
        type: String
    },
    anoInicio: {
        type: String
    },
    anoFim: {
        type: String
    },
    local: {
        type: String
    },
    aprendizado: {
        type: String,
        required: true
    },
    habilidades: {
        type: String
    }
})

const Experiencia = models.Experiencia || model('Experiencia', ExperienciaSchema);
export default Experiencia;
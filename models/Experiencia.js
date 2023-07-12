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
    }
})

const Experiencia = models.Experiencia || model('Experiencia', ExperienciaSchema);
export default Experiencia;
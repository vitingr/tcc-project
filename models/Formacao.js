import {Schema, model, models} from "mongoose"

const newFormacao = new Schema({

    dono: {
        type: Schema.Types.ObjectId,
        ref: "usuarios",
        required: true        
    },
    nome: {
        type: String,
        required: true
    },
    tipo: {
        type: String,
        required: true
    },
    area: {
        type: String
    }

})

const Formacao = models.Formacao || model('formacoes', newFormacao);
export default Formacao;
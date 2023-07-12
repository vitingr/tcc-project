import {Schema, model, models} from "mongoose"

const newVaga = new Schema({

    empresa: {
        type: Schema.Types.ObjectId,
        ref: "empresas",
        required: true
    },
    nomeEmpresa: {
        type: String,
        required: true
    },
    cargo: {
        type: String,
        required: true
    },
    modelo: {
        type: String,
        required: true
    },
    tipo: {
        type: String,
        required: true
    },
    local: {
        type: String,
        required: true
    },
    salarioMinimo: {
        type: Number,
        required: true
    },
    salarioMaximo: {
        type: Number
    },
    vagasDisponiveis: {
        type: Number
    },
    descricao: {
        type: String,
        required: true
    },
    linkEmpresa: {
        type: String
    },
    foto: {
        type: String
    }

})

const Vaga = models.Vaga || model('vagas', newVaga);
export default Vaga;
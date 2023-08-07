import { Schema, model, models } from "mongoose"

const VagaSchema = new Schema({

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
    titulo: {
        type: String,
        required: true
    },
    modelo: {
        type: String
    },
    tipo: {
        type: String,
        required: true
    },
    local: {
        type: String,
        required: true
    },
    salario: {
        type: Number,
        required: true
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
    },
    requisitos: {
        type: String
    }

})

const Vaga = models.Vaga || model('Vaga', VagaSchema);
export default Vaga;
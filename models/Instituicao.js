import {Schema, model, models} from "mongoose"

const newInstituicao = new Schema({

    dono: {
        type: Schema.Types.ObjectId,
        ref: "usuarios",
        required: true
    },
    modalidade: {
        type: String,
        required: true
    },
    nome: {
        type: String,
        required: true
    },
    website: {
        type: String
    },
    qtdFuncionarios: {
        type: String,
        required: true
    },
    industria: {
        type: String,
        required: true
    },
    tipo: {
        type: String,
        required: true
    },
    descricao: {
        type: String
    },
    logo: {
        type: String
    },
    seguidores: {
        type: Number,
        default: 0
    }

})

const Instituicao = models.Instituicao || model('instituicoes', newInstituicao);
export default Instituicao;
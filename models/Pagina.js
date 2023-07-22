import {Schema, model, models} from "mongoose"

const PaginaSchema = new Schema({

    dono: {
        type: Schema.Types.ObjectId,
        ref: "usuarios",
        required: true
    },
    modelo: {
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
        type: String
    },
    descricao: {
        type: String
    },
    logo: {
        type: String,
        default: "https://cdn-icons-png.flaticon.com/512/5809/5809858.png"
    },
    background: {
        type: String
    },
    seguidores: {
        type: Number,
        default: 0
    }

})

const Pagina = models.Pagina || model('mundoebebersssoeeds', PaginaSchema);
export default Pagina;
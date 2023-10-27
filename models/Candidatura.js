import { Schema, model, models } from "mongoose"

const CandidaturaSchema = new Schema({
    dono: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    pagina: {
        type: String,
        required: true
    },
    vaga: {
        type: String,
        required: true
    },
    paginaFoto: {
        type: String,
        default: "https://cdn-icons-png.flaticon.com/512/5809/5809858.png"
    },
    candidatoFoto: {
        type: String,
        default: "https://static.licdn.com/sc/h/1c5u578iilxfi4m4dvc4q810q"
    },
    nome: {
        type: String,
        required: true
    },
    titulo: {
        type: String
    },
    cargo: {
        type: String
    },
    descricao: {
        type: String
    },
    data: {
        type: String
    },
    open: {
        type: Boolean
    }
})

const Candidatura = models.Candidatura || model('Candidatura', CandidaturaSchema);
export default Candidatura
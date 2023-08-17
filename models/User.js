import { Schema, model, models } from 'mongoose'

const UserSchema = new Schema({
    logado: {
        type: Number,
        default: true
    },
    tipoConta: {
        type: String,
        default: "usuario",
        required: true
    },
    nome: {
        type: String,
        required: true,
        match: [/^(?=.{3,40}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username inválido, ele deve conter 8-20 caracteres alfanuméricos e ser único!"]
    },
    sobrenome: {
        type: String,
        required: true
    },
    nomeCompleto: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    senha: {
        type: String,
        required: true
    },
    endereco: {
        type: Schema.Types.ObjectId,
        ref: "enderecos"
    },
    ultimo_cargo: {
        type: String
    },
    ultima_empresa: {
        type: String
    },
    ultimo_contrato: {
        type: String
    },
    area: {
        type: String
    },
    preferencia_emprego: {
        type: String
    },
    procurando_emprego: {
        type: String
    },
    escola: {
        type: String
    },
    amigos: {
        type: String
    },
    amigos_pendentes: {
        type: String
    },
    notificacoes: {
        type: Number,
        default: 0
    },
    paginas: {
        type: String
    },
    foto: {
        type: String
    },
    background: {
        type: String
    },
    seguidores: {
        type: Number
    },
    resumo: {
        type: String
    },
    cargo_atual: {
        type: String,
    },
    telefone: {
        type: String
    },
    website: {
        type: String
    },
    formacao: {
        type: Schema.Types.ObjectId,
        ref: "formacoes"
    },
    novoUsuario: {
        type: Number,
        default: true
    },
    tema: {
        type: String,
        default: "light",
        required: true
    },
    profile_views: {
        type: Number
    },
    profile_searchs: {
        type: Number
    }

})

const User = models.User || model("User", UserSchema)
export default User
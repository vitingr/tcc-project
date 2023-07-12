import {Schema, model, models} from "mongoose"

const PostagemSchema = new Schema({

    dono: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true        
    },
    fotoDono: {
        type: String,
        default: "https://www.socialdub.com/profilepictures/205076/2050760159395408.jpg?x2"
    },
    nomeDono: {
        type: String,
        required: true,
    },
    data: {
        type: Date,
        default: Date.now()
    },
    conteudo: {
        type: String,
        required: true
    },
    fotos: {
        type: String
    },
    curtidas: {
        type: Number
    },
    compartilhamentos: {
        type: Number
    }

})

const Postagem = models.Postagem || model('Postagem', PostagemSchema);
export default Postagem;
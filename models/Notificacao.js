import {Schema, model, models} from "mongoose"

const NotificaoSchema = new Schema({

    dono: {
        type: Schema.Types.ObjectId,
        ref: "usuarios",
        required: true        
    },
    texto: {
        type: String
    },
    tipo: {
        type: String,
        required: true
    },
    foto: {
        type: String,
        default: "https://static.licdn.com/sc/h/f11v1qjrri2wv7j3p61nisjwy"
    },
    cor: {
        type: String
    },
    link: {
        type: String
    }

})

const Notificacao = models.Notificacao || model('Notificacao', NotificaoSchema);
export default Notificacao;
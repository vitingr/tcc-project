import { Schema, model, models } from "mongoose"

const CertificadoSchema = new Schema({

    dono: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    nome: {
        type: String,
        required: true
    },
    unidade: {
        type: String,
        required: true
    },
    foto: {
        type: String,
        default: "https://cdn-icons-png.flaticon.com/512/5809/5809858.png"
    }

})

const Certificado = models.Certificado || model('Certificado', CertificadoSchema);
export default Certificado
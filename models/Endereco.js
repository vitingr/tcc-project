import {Schema, model, models} from "mongoose"

const EnderecoSchema = new Schema({

    dono: {
        type: Schema.Types.ObjectId,
        ref: "usuarios",
        required: true
    },
    pais: {
        type: String,
        required: true
    },
    estado: {
        type: String,
        required: true
    },
    cidade: {
        type: String,
        required: true
    }

})

const Endereco = models.Endereco || model('Endereco', EnderecoSchema);
export default Endereco;
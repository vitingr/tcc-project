import {Schema, model, models} from "mongoose"

const newEndereco = new Schema({

    dono: {
        type: Schema.Types.ObjectId,
        ref: "usuarios"
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
    },
})

const Endereco = models.Endereco || model('enderecos', newEndereco);
export default Endereco;
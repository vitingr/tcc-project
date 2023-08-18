import { Schema, model, models } from 'mongoose'

const PremiumSchema = new Schema({
    dono: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    background: {
      type: String,
      default: "static"
    }

})

const Premium = models.Premium || model("Premium", PremiumSchema)
export default Premium
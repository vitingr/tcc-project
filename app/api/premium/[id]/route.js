import { ConnectToDB } from "@utils/database";
import User from "@models/User";
import Premium from "@models/Premium";

export const GET = async (request, { params }) => {
  try {

    await ConnectToDB()

    const user = await User.findOne({ _id: params.id })
    const premium = await Premium.findOne({ dono: params.id })

    if (user.premium === 1 && premium) {

      return new Response(JSON.stringify(premium), { status: 200 })
      
    }

  } catch (error) {
    console.log(error)
    return new Response(`Falha ao fazer o GET dos posts, ${error}`, { status: 500 })
  }
}
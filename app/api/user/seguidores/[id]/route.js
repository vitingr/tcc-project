import { ConnectToDB } from "@utils/database";
import User from "@models/User";

export const GET = async (request, {params}) => {
  try {
    await ConnectToDB()

    const user = await User.findOne({ _id: params.id })

    if (user) {
      return new Response(JSON.stringify(user), { status: 200 })
    } else {
      return new Response(`Não foi possível encontrar o usuário. ${error}`, { status: 500 })
    }

  } catch (error) {
    return new Response(`Falha ao fazer o GET do Usuário. ${error}`, { status: 500 })
  }
}
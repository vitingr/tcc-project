import { ConnectToDB } from "@utils/database";
import User from "@models/User";

export const POST = async (request) => {
  const { userId } = await request.json()

  try {
    await ConnectToDB()

    const user = await User.findOne({ _id: userId })

    user.novoUsuario = 0

    if (user) {
      user.save()
      return new Response("Usuário atualizado com sucesso!", { status: 200 })
    } else {
      return new Response(`Não foi possível encontrar o usuário. ${error}`, { status: 500 })
    }
  } catch (error) {
    return new Response(`Falha ao fazer o GET do Usuário. ${error}`, { status: 500 })
  }
}
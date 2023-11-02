import { ConnectToDB } from "@utils/database";
import User from "@models/User";
import Premium from "@models/Premium";

export const POST = async (request) => {
  const { userId } = await request.json()

  if (userId) {

    try {

      await ConnectToDB()

      const premium = await Premium.findOne({ dono: userId })

      if (premium.background === 'static') {
        premium.background = 'animated'
      } else {
        premium.background = 'static'
      }

      await premium.save()

      return new Response(JSON.stringify(premium), { status: 200 })

    } catch (error) {
      console.log(error)
      return new Response(`Erro ao verificar o background ${error}`, { status: 500 })
    }

  } else {
    return new Response(`Não foi possível encontrar o usuário`, { status: 500 })
  }
}
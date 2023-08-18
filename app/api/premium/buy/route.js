import { ConnectToDB } from "@utils/database";
import User from "@models/User";
import Premium from "@models/Premium";

export const POST = async (request) => {
  const { userId } = await request.json()
  console.log(userId)

  if (userId) {

    try {

      await ConnectToDB()

      const user = await User.findOne({ _id: userId })

      const newPremium = new Premium({
        dono: userId,
        background: "static"
      })

      console.log(user)
      user.premium = 1

      await newPremium.save()
      await user.save()
      return new Response(JSON.stringify(newPremium), { status: 200 })

    } catch (error) {
      console.log(error)
      return new Response(`Erro ao comprar o premium ${error}`, { status: 500 })
    }

  } else {
    return new Response(`Não foi possível encontrar o usuário`, { status: 500 })
  }
}
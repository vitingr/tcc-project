import { ConnectToDB } from "@utils/database";
import User from "@models/User";

export const GET = async (request, { params }) => {
  try {

    await ConnectToDB()

    const parametro = params.params
    const separeted = parametro.split("-")
    const query = separeted.join(" ")

    if (query) {

      try {

        const users = await User.find({ nomeCompleto: new RegExp(query, 'i')}).exec();

        return new Response(JSON.stringify(users), { status: 200 })

      } catch (error) {
        console.log(error)
        return new Response(`Não foi possível encontrar nada relacionado, ${error}`, { status: 500 })
      }
    }
  } catch (error) {
    console.log(error)
    return new Response(`Falha ao se conectar ao banco de dados, ${error}`, { status: 500 })
  }
}
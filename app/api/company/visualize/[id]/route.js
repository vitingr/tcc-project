import { ConnectToDB } from "@utils/database";
import Pagina from "@models/Pagina";
export const GET = async (request, { params }) => {
  try {
    await ConnectToDB()

      const page = await Pagina.findOne({ _id: params.id }).lean()

      if (page) {
        return new Response(JSON.stringify(page), { status: 200 })
      } else {
        return new Response(`Falha ao localizar a empresa, ${error}`, { status: 500 })
      }

  } catch (error) {
    return new Response(`Falha ao localizar o Usuário, ${error}`, { status: 500 })
  }
}
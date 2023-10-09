import { ConnectToDB } from "@utils/database";
import Pagina from "@models/Pagina";

export const GET = async (request, { params }) => {
  try {
    await ConnectToDB()
    
    try {
      let pages_options = []
      const response = await Pagina.find({ dono: { $ne: params.id } }).lean()

      response.forEach((opcao) => {
        if (opcao.seguidores.includes(params.id)) {
          pages_options.push(opcao)
        } else {
          return 1
        }
      })
      if (pages_options) {
        return new Response(JSON.stringify(pages_options), { status: 200 })
      } else {
        console.log("ERRO ao encontrar as páginas")
      }

    } catch (error) {
      return new Response(`Falha ao encontrar as páginas, ${error}`, { status: 500 })
    }

  } catch (error) {
    return new Response(`Falha ao fazer o GET das páginas, ${error}`, { status: 500 })
  }
}
import { ConnectToDB } from "@utils/database";
import Pagina from "@models/Pagina";
import User from "@models/User";

export const GET = async (request, { params }) => {
  try {
    await ConnectToDB()

    const usuario = await User.findOne({ _id: params.id }).lean()

    if (usuario.tipoConta == "empresa" || usuario.tipoConta == "instituicao") {

      const page = await Pagina.findOne({ dono: params.id }).lean()

      if (page) {
        return new Response(JSON.stringify(page), { status: 200 })
      } else {
        return new Response(`Falha ao localizar a empresa, ${error}`, { status: 500 })
      }

    } else {
      return new Response(`Conta não empresarial, ${error}`, { status: 500 })
    }

  } catch (error) {
    return new Response(`Falha ao localizar o Usuário, ${error}`, { status: 500 })
  }
}
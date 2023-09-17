import { ConnectToDB } from "@utils/database";
import Vaga from "@models/Vaga";

export const GET = async (request, { params }) => {
  try {

    await ConnectToDB()

    const parametro = params.params
    const separeted = parametro.split("-")
    const query = separeted.join(" ")

    if (query) {

      try {

        const vagas = await Vaga.find({ $or: [{nomeEmpresa: new RegExp(query, 'i')}, {cargo: new RegExp(query, 'i')}, {titulo: new RegExp(query, 'i')}, ]}).exec();

        return new Response(JSON.stringify(vagas), { status: 200 })

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
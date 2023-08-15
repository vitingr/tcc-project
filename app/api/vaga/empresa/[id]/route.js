import { ConnectToDB } from "@utils/database";
import Vaga from "@models/Vaga";

export const GET = async (request, { params }) => {
  try {

    await ConnectToDB()

    console.log(params.id)

    try {
      console.log(params.id)
      const response = await Vaga.find({ empresa: params.id}).lean()
      // const response = await Vaga.find({dono: {$ne: params.id}}).lean()

      if (response) {
        return new Response(JSON.stringify(response), { status: 200 })
      }

    } catch (error) {
      console.log(error)
      return new Response(`Houve ao fazer o GET das vagas, ${error}`, { status: 500 })
    }

  } catch (error) {
    console.log(error)
    return new Response(`Falha ao encontrar as vagas, ${error}`, { status: 500 })
  }
}
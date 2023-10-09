import { ConnectToDB } from "@utils/database";
import Candidatura from "@models/Candidatura";

export const GET = async (request, { params }) => {
  try {

    await ConnectToDB()

    try {

      const response = await Candidatura.find({vaga: params.id}).lean()

      if (response) {
        return new Response(JSON.stringify(response), { status: 200 })
      }

    } catch (error) {
      return new Response(`Houve ao fazer o GET das candidaturas, ${error}`, { status: 500 })
    }

  } catch (error) {
    return new Response(`Falha ao encontrar as candidaturas, ${error}`, { status: 500 })
  }
}
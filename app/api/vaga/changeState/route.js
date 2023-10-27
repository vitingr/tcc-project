import { ConnectToDB } from "@utils/database";
import Vaga from "@models/Vaga";

export const POST = async (request) => {
  const { vagaId } = await request.json()
  try {

    await ConnectToDB()

    if (!vagaId) {
      return new Response("Vaga não encontrada!", { status: 404 })
    } else {

      try {
        const vaga = await Vaga.findOne({ _id: vagaId })

        if (vaga) {

          if (vaga.ativa === true) {
            vaga.ativa = false
          } else {
            vaga.ativa = true
          }

          await vaga.save()
          return new Response("Vaga editada com sucesso", { status: 200 })
        }

      } catch (error) {
        console.log(error)
        return new Response(`Houve um erro ao criar a vaga, ${error}`, { status: 500 })
      }
    }
  } catch (error) {
    console.log(error)
    return new Response(`Falha ao criar a vaga, ${error}`, { status: 500 })
  }
}
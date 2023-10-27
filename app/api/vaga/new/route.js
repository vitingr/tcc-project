import { ConnectToDB } from "@utils/database";
import Pagina from "@models/Pagina";
import Vaga from "@models/Vaga";

export const POST = async (request) => {
  const { userId, titulo, cargo, tipo, requisitos, sobre, salario } = await request.json()
  try {

    await ConnectToDB()

    if (!userId) {
      return new Response("Usuário não encontrado!", { status: 404 })
    } else {

      const page = await Pagina.findOne({ dono: userId }).lean()

      if (page) {

        try {
          const newVaga = new Vaga({
            empresa: page._id,
            nomeEmpresa: page.nome,
            cargo: cargo,
            titulo: titulo,
            tipo: tipo,
            local: "Santa Bárbara d'Oeste, SP",
            salario: salario,
            descricao: sobre,
            requisitos: requisitos,
            foto: page.foto,
            ativa: true
          })

          await newVaga.save()
          return new Response(JSON.stringify(newVaga), { status: 200 })

        } catch (error) {
          console.log(error)
          return new Response(`Houve um erro ao criar a vaga, ${error}`, { status: 500 })
        }
      }
    }
  } catch (error) {
    console.log(error)
    return new Response(`Falha ao criar a vaga, ${error}`, { status: 500 })
  }
}
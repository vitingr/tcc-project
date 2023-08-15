import { ConnectToDB } from "@utils/database";
import Pagina from "@models/Pagina";

export const POST = async (request) => {

  const { userId, nome, website, qtdFuncionarias, industria, tipo, logo, background, endereco, descricao } = await request.json()

  // Verificar Parametros
  if (userId) {
    try {
      await ConnectToDB()
      const page = await Pagina.findOne({ dono: userId })

      if (page) {

        page.nome = nome
        page.website = website
        page.qtdFuncionarios = qtdFuncionarias
        page.industria = industria
        page.tipo = tipo
        page.background = background
        page.endereco = endereco
        page.descricao = descricao
        page.foto = logo
        
        page.save()
        return new Response("Página atualizada com sucesso!", { status: 200 })

      } else {
        return new Response(`Não foi possível encontrar a página`, { status: 500 })
      }
    } catch (error) {
      console.log(error)
      return new Response(`Falha ao conectar ao banco de dado. ${error}`, { status: 500 })
    }
  } else {
    console.log(error)
    return new Response(`Não foi possível encontrar o dono da página. ${error}`, { status: 500 })
  }
}
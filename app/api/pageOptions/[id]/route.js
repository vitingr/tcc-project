import { ConnectToDB } from "@utils/database";
import Vaga from "@models/Vaga";

function amigosAleatorios(amigos, quantidade) {

  const array = []
  let contador = 0

  if (amigos.length >= quantidade) {
    for (contador; contador <= quantidade; contador++) {
      const numero = Math.floor(Math.random() * amigos.length);

      let valor = amigos[numero]
      if (array.includes(valor)) {
        console.log("Valor Inválido")
      } else {
        array.push(valor)
      }
    }
  } else {
    for (contador; contador <= amigos.length; contador++) {
      const numero = Math.floor(Math.random() * amigos.length);

      let valor = amigos[numero]
      if (array.includes(valor)) {
        console.log("Valor Inválido")
      } else {
        array.push(valor)
      }
    }
  }

  return array

}

export const GET = async (request, { params }) => {
  try {
    await ConnectToDB()
    try {
      let options = []
      const response = await Vaga.find().lean()

      response.forEach((opcao) => {
        if (!opcao) {
          console.log("Não existe")
        } else {
          options.push(opcao)
        }
      })

      const search = async () => {
        const paginas = amigosAleatorios(options, 5)
        return paginas
      }

      const options_pages = await search()

      if (options_pages) {
        return new Response(JSON.stringify(options_pages), { status: 200 })
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
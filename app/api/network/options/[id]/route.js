import { ConnectToDB } from "@utils/database";
import User from "@models/User";

async function amigosAleatorios(amigos, quantidade) {

  const array = []
  let contador = 0

  if (amigos.length > quantidade) {
    for (contador; contador <= quantidade; contador++) {
      const numero = Math.floor(Math.random() * amigos.length);

      let valor = amigos[numero]
      if (array.includes(valor)) {
        console.log("")
      } else {
        array.push(valor)
      }
    }
  } else {
    for (contador; contador <= amigos.length; contador++) {
      const numero = Math.floor(Math.random() * amigos.length);

      let valor = amigos[numero]
      if (array.includes(valor)) {
        console.log("")
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
      const response = await User.find({ _id: { $ne: params.id } }).lean()

      response.forEach((opcao) => {
        if (opcao.amigos_pendentes.includes(params.id) || opcao.amigos.includes(params.id)) {
          console.log("")
        } else {
          options.push(opcao)
        }
      })

      console.log(`OPTIONS: ${options}`)

      const search = async () => {
        const friends = await amigosAleatorios(options, 5)
        return friends
      }

      const options_amigos = await search()

      console.log(options_amigos)

      if (options_amigos) {
        return new Response(JSON.stringify(options_amigos), { status: 200 })
      } else {
        console.log("ERRO ao encontrar as pessoas")
      }

    } catch (error) {
      console.log(error)
      return new Response(`Falha ao encontrar as pessoas, ${error}`, { status: 500 })
    }

  } catch (error) {
    console.log(error)
    return new Response(`Falha ao fazer o GET das pessoas, ${error}`, { status: 500 })
  }
}
import { ConnectToDB } from "@utils/database";
import Pagina from "@models/Pagina";

export const POST = async (request) => {
  const { userId, pagina } = await request.json()
  try {
    await ConnectToDB()

    try {
      const page = await Pagina.findOne({ _id: pagina })
      const seguidores = page.seguidores

      if (seguidores.includes(userId)) {
        return new Response(`Não é possível seguir a mesma página duas vezes`, { status: 500 })
      } else {
        try {
          page.qtdSeguidores += 1
          page.seguidores = page.seguidores + `${userId} `
          await page.save()

          return new Response(`Amigo Adicionado com sucesso!`, { status: 200 })

        } catch (error) {
          console.log(error)
        }
      }

    } catch (error) {
      return new Response(`Falha ao encontrar as pessoas, ${error}`, { status: 500 })
    }

  } catch (error) {
    return new Response(`Falha ao fazer o GET das pessoas, ${error}`, { status: 500 })
  }
}
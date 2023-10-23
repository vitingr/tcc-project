import { ConnectToDB } from "@utils/database";
import Postagem from "@models/Postagem";

export const POST = async (request) => {
  const { postId, userId } = await request.json()

  try {

    await ConnectToDB()

    if (userId) {
      const postagem = await Postagem.findOne({_id: postId})

      if (!postagem.idsCurtidas.includes(userId)) {
        postagem.idsCurtidas += ` ${userId}`
        postagem.curtidas += 1

      } else {

        const curtidas_separadas = postagem.idsCurtidas.split(" ")
        const indice = curtidas_separadas.indexOf(userId)
        
        curtidas_separadas.splice(indice, 1)
        postagem.idsCurtidas = curtidas_separadas.join(" ")

        postagem.curtidas -= 1
      }

      await postagem.save()

      return new Response("Postagem foi curtida", {status: 200})
    }

  } catch (error) {
    console.log(error)
    return new Response(`Falha ao curtir a postagem, ${error}`, { status: 500 })
  }
}
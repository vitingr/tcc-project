import { ConnectToDB } from "@utils/database";
import Post from "@components/Post";

export const GET = async (request, { params }) => {
  try {

    await ConnectToDB()

    const parametro = params.params
    const separeted = parametro.split("-")
    const query = separeted.join(" ")

    if (query) {

      try {

        const posts = await Post.find({ conteudo: new RegExp(query, 'i')}).exec();

        return new Response(JSON.stringify(posts), { status: 200 })

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
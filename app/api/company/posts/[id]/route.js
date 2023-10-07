import { ConnectToDB } from "@utils/database";
import Postagem from "@models/Postagem";

export const GET = async (request, { params }) => {
  try {
    await ConnectToDB()

    const postagens = await Postagem.find({dono: params.id})

    return new Response(JSON.stringify(postagens), {status: 200})

  } catch (error) {
    console.log(error)
    return new Response(`Falha ao localizar o Usuário, ${error}`, { status: 500 })
  }
}
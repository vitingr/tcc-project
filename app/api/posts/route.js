import { ConnectToDB } from "@utils/database";
import Postagem from "@models/Postagem";

export const GET = async (request) => {
    try {

        await ConnectToDB()

        const posts = await Postagem.find().sort({data: 'desc'})

        return new Response(JSON.stringify(posts), {status: 200})

    } catch (error) {
        console.log(error)
        return new Response(`Falha ao fazer o GET dos posts, ${error}`, {status: 500})
    }
}
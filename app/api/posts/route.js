import { ConnectToDB } from "@utils/database";
import Postagem from "@models/Postagem";

export const GET = async (request, {params}) => {
    try {

        await ConnectToDB()

        const posts = Postagem.find()
        return new Response(JSON.stringify(posts), {status: 200})

    } catch (error) {
        return new Response(`Falha ao fazer o GET dos posts, ${error}`, {status: 500})
    }
}
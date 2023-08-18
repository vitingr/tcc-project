import { ConnectToDB } from "@utils/database";
import Endereco from "@models/Endereco";

export const GET = async (request, {params}) => {
    try {

        await ConnectToDB()

        const endereco = await Endereco.findOne({dono: params.id})
        return new Response(JSON.stringify(endereco), {status: 200})

    } catch (error) {
        return new Response(`Falha ao fazer o GET dos posts, ${error}`, {status: 500})
    }
}
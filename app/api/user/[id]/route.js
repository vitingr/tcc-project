import { ConnectToDB } from "@utils/database";
import User from "@models/User";

export const GET = async (request, {params}) => {
    try {

        await ConnectToDB()
        
        const user = await User.findOne({_id: params.id})
        if (!user) {
            return new Reponse("Usuário não encontrado!", { status: 404 })
        }
        
        return new Response(JSON.stringify(user), {status: 200})

    } catch (error) {
        return new Response(`Falha ao fazer o GET dos posts, ${error}`, {status: 500})
    }
}
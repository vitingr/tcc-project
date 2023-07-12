import { ConnectToDB } from "@utils/database";
import User from "@models/User";

export const GET = async (request, {params}) => {
    try {

        await ConnectToDB()

        const user = await User.findOne({email: params.user})
        return new Response(JSON.stringify(posts), {status: 200})

    } catch (error) {
        return new Response(`Falha ao fazer o GET dos posts, ${error}`, {status: 500})
    }
}
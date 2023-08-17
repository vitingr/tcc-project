import { ConnectToDB } from "@utils/database";
import User from "@models/User";
import Post from "@components/Post";

export const POST = async (request) => {
    const { myUser, userId } = await request.json()
    // Verificar Parametros
    if (userId && myUser) {
        try {
            await ConnectToDB()

            const user = await User.findOne({ _id: userId })

            user.profile_views += 1

            if (user) {

                user.save()
                return new Response("Usuário atualizado com sucesso!", { status: 200 })

            } else {
                return new Response(`Não foi possível encontrar o usuário. ${error}`, { status: 500 })
            }
        } catch (error) {
            return new Response(`Falha ao fazer o GET do Usuário. ${error}`, { status: 500 })
        }
    } else {
        return new Response(`Não foi possível encontrar o usuário. ${error}`, { status: 500 })
    }
}
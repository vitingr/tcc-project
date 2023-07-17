import { ConnectToDB } from "@utils/database";
import User from "@models/User";

export const POST = async (request, { params }) => {
    const { userId, tema } = await request.json()

    // Verificação de Usuário
    if (userId) {
        try {

            await ConnectToDB()

            // Alterar tema
            const user = await User.findOne({ _id: userId })
            user.tema = `${tema}`
            user.save()
            return new Response("Tema Alterado com sucesso!", { status: 200 })

        } catch (error) {
            return new Response(`Falha ao fazer o consultar as informações do usuário, ${error}`, { status: 500 })
        }
    } else {
        return new Response(`Não foi possível encontrar o usuário, ${error}`, { status: 500 })
    }
}
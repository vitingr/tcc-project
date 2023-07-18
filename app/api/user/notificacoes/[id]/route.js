import { ConnectToDB } from "@utils/database";
import User from "@models/User";
import Notificacao from "@models/Notificacao";

export const GET = async (request, { params }) => {
    try {
        await ConnectToDB()

        // Query Busca de Notificações
        const notificacoes = await Notificacao.find({ dono: params.id })

        if (notificacoes) {
            return new Response(JSON.stringify(notificacoes), { status: 200 })
        } else {
            return new Response(`Nenhuma Notificação foi encontrada, ${error}`, { status: 500 })
        }

    } catch (error) {
        return new Response(`Falha ao fazer o consultar as informações do usuário, ${error}`, { status: 500 })
    }
}
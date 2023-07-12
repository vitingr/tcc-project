import { ConnectToDB } from "@utils/database";
import User from "@models/User";

export const GET = async (request, { params }) => {
    try {
        await ConnectToDB()
        // Verificar convites enviados
        try {
            const convitesPendentes = []
            const convites = []

            const user = await User.findOne({ _id: params.id }).lean()
            const answer = user.amigos_pendentes.split(" ")

            answer.forEach(convite => {
                if (convite == 0 || convite == null || convite == undefined || convite == "" || !convite) {
                    console.log("Amigo Invalido")
                } else {
                    convites.push(convite)
                }
            })

            const response = await User.find({ _id: { $in: convites } }).lean()
            response.forEach((opcao) => {

                if (opcao.amigos.includes(params.id)) {
                    return new Response(`Amigo já adicionado`, { status: 500 })
                } else {
                    convitesPendentes.push(opcao)
                }
            })
            if (convitesPendentes) {
                return new Response(JSON.stringify(convitesPendentes), { status: 200 })
            } else {
                console.log("ERRO ao encontrar os convites enviados")
            }

        } catch (error) {
            console.log(error)
            return new Response(`Falha ao encontrar os convites enviados, ${error}`, { status: 500 })
        }

    } catch (error) {
        return new Response(`Falha ao fazer o GET dos convites enviados, ${error}`, { status: 500 })
    }
}
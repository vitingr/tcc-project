import { ConnectToDB } from "@utils/database";
import User from "@models/User";

export const GET = async (request, { params }) => {
    try {
        await ConnectToDB()
        // Verificar convites enviados
        try {
            let convitesEnviados = []
            const response = await User.find({_id: {$ne: params.id}}).lean()
            response.forEach((opcao) => {
                if (opcao.amigos_pendentes.includes(params.id)) {
                    convitesEnviados.push(opcao)
                }
            })
            if (convitesEnviados) {
                return new Response(JSON.stringify(convitesEnviados), { status: 200 })
            } else {
                console.log("ERRO ao encontrar os convites enviados")
            }

        } catch (error) {
            return new Response(`Falha ao encontrar os convites enviados, ${error}`, { status: 500 })
        }

    } catch (error) {
        return new Response(`Falha ao fazer o GET dos convites enviados, ${error}`, { status: 500 })
    }
}
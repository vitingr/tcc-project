import { ConnectToDB } from "@utils/database";
import User from "@models/User";

export const POST = async (request) => {

    const { userId, amigo } = await request.json()
    try {
        await ConnectToDB()
        // Verificar convites enviados
        try {
            const response = await User.findOne({ _id: amigo })
            const amigosSeparados = response.amigos_pendentes.split(" ")
            const indice = amigosSeparados.indexOf(userId)
            
            amigosSeparados.splice(indice, 1)
            response.amigos_pendentes = amigosSeparados.join(" ")

            response.save()
            return new Response("Convite Rejeitado!", { status: 200 })

        } catch (error) {
            return new Response(`Falha ao encontrar os convites enviados, ${error}`, { status: 500 })
        }

    } catch (error) {
        return new Response(`Falha ao fazer o GET dos convites enviados, ${error}`, { status: 500 })
    }
}
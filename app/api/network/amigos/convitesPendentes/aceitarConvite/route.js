import { ConnectToDB } from "@utils/database";
import User from "@models/User";

export const POST = async (request, { params }) => {
    const { userId, amigo } = await request.json()
    try {
        await ConnectToDB()
        try {
            // Encontrar Usuários
            const user = await User.findOne({ _id: userId })
            const friend = await User.findOne({ _id: amigo })

            if (user.amigos.includes(amigo) || friend.amigos.includes(userId)) {
                return new Response(`Não é possível adicionar o mesmo amigo duas vezes, ${error}`, { status: 500 })
            } else {
                // Adicionar Seguidores
                user.seguidores += 1
                friend.seguidores += 1

                user.amigos += `${amigo} `
                friend.amigos += `${userId} `

                // Remover Convite Pendente
                const amigosPendentes = []
                const answer = user.amigos_pendentes.split(" ")

                answer.forEach(amigo => {
                    if (amigo == 0 || amigo == null || amigo == undefined || amigo == "" || !amigo) {
                        console.log("Amigo Invalido")
                    } else {
                        amigosPendentes.push(amigo)
                    }
                })

                var indice = amigosPendentes.indexOf(userId)
                amigosPendentes.splice(indice, 1)
                user.amigos_pendentes = amigosPendentes.join(" ")
                user.save()
                friend.save()
                return new Response(JSON.stringify(amigosPendentes), { status: 200 })

            }

        } catch (error) {
            return new Response(`Falha ao encontrar os convites enviados, ${error}`, { status: 500 })
        }

    } catch (error) {
        return new Response(`Falha ao fazer o GET dos convites enviados, ${error}`, { status: 500 })
    }
}
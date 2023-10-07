import { ConnectToDB } from "@utils/database";
import User from "@models/User";

export const POST = async (request) => {

    const { userId, amigoId } = await request.json()
    try {
        await ConnectToDB()

        try {
            const user = await User.findOne({ _id: userId })
            const amigos_separados1 = user.amigos.split(" ")
            const indice1 = amigos_separados1.indexOf(amigoId)
            
            amigos_separados1.splice(indice1, 1)
            user.amigos = amigos_separados1.join(" ")

            user.seguidores -= 1

            const amigo = await User.findOne({ _id: amigoId })
            const amigos_separados2 = amigo.amigos.split(" ")
            const indice2 = amigos_separados2.indexOf(userId)
            
            amigos_separados2.splice(indice2, 1)
            amigo.amigos = amigos_separados2.join(" ")

            amigo.seguidores -= 1

            await user.save()
            await amigo.save()
            return new Response("Amizade Desfeita", { status: 200 })


        } catch (error) {
            return new Response(`Falha ao encontrar os convites enviados, ${error}`, { status: 500 })
        }

    } catch (error) {
        return new Response(`Falha ao fazer oo se conectar com o banco de dados, ${error}`, { status: 500 })
    }
}
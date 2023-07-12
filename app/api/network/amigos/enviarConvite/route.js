import { ConnectToDB } from "@utils/database";
import User from "@models/User";

export const POST = async (request) => {
    const { userId, amigo } = await request.json()
    try {
        await ConnectToDB()
        
        try {
            const amigoData = await User.findOne({_id: amigo})
            const amigos_atuais = amigoData.amigos
            const amigos_pendentes = amigoData.amigos_pendentes

            if (amigos_pendentes.includes(userId) || amigos_atuais.includes(userId)) {
                return new Response(`Não é possível adicionar o mesmo amigo duas vezes`, { status: 500 })
            } else {

                try {
                    amigoData.notificacoes += 1
                    amigoData.amigos_pendentes = amigoData.amigos_pendentes + `${userId} `
                    await amigoData.save()

                    return new Response(`Amigo Adicionado com sucesso!`, { status: 200 })

                } catch (error) {
                    console.log(error)
                }
            }

        } catch (error) {
            return new Response(`Falha ao encontrar as pessoas, ${error}`, { status: 500 })
        }

    } catch (error) {
        return new Response(`Falha ao fazer o GET das pessoas, ${error}`, { status: 500 })
    }
}
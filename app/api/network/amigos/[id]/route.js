import { ConnectToDB } from "@utils/database";
import User from "@models/User";

export const GET = async (request, { params }) => {
    try {
        await ConnectToDB()
        // Criar novo Certificado
        try {
            let addAmigos = []
            const response = await User.find({_id: {$ne: params.id}}).lean()
            response.forEach((opcao) => {
                if (opcao.amigos_pendentes.includes(params.id) || opcao.amigos.includes(params.id)) {
                    console.log("Amigo já adicionado")
                } else {
                    addAmigos.push(opcao)
                }
            })
            if (addAmigos) {
                return new Response(JSON.stringify(addAmigos), { status: 200 })
            } else {
                console.log("ERRO ao encontrar as pessoas")
            }

        } catch (error) {
            return new Response(`Falha ao encontrar as pessoas, ${error}`, { status: 500 })
        }

    } catch (error) {
        return new Response(`Falha ao fazer o GET das pessoas, ${error}`, { status: 500 })
    }
}
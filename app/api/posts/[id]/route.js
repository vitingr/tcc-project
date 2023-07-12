import { ConnectToDB } from "@utils/database";
import Postagem from "@models/Postagem";

export const GET = async (request, { params }) => {
    try {
        await ConnectToDB()
        // Criar novo Certificado
        try {
            const response = await Postagem.find()
            if (response) {
                return new Response(JSON.stringify(response), { status: 200 })
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
import { ConnectToDB } from "@utils/database";
import Experiencia from "@models/Experiencia";

export const GET = async (request, {params}) => {
    try {
        await ConnectToDB()
        // Criar novo Certificado
        try {
            const experiencias = await Experiencia.find({dono: params.id}).lean()
            if (experiencias) {

                    return new Response(JSON.stringify(experiencias), { status: 200 })
            } else {
                console.log("ERRO ao encontrar os experiencias")
            }

        } catch (error) {
            return new Response(`Falha ao encontrar os experiencias, ${error}`, { status: 500 })
        }


    } catch (error) {
        return new Response(`Falha ao fazer o GET dos experiencias, ${error}`, { status: 500 })
    }
}
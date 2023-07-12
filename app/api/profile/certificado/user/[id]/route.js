import { ConnectToDB } from "@utils/database";
import Certificado from "@models/Certificado";

export const GET = async (request, {params}) => {
    try {
        await ConnectToDB()
        // Criar novo Certificado
        try {
            const certificados = await Certificado.find({dono: params.id}).lean()
            if (certificados) {

                    return new Response(JSON.stringify(certificados), { status: 200 })
            } else {
                console.log("ERRO ao encontrar os certificados")
            }

        } catch (error) {
            return new Response(`Falha ao encontrar os certificados, ${error}`, { status: 500 })
        }


    } catch (error) {
        return new Response(`Falha ao fazer o GET dos certificados, ${error}`, { status: 500 })
    }
}
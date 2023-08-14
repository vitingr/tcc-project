import { ConnectToDB } from "@utils/database";
import Certificado from "@models/Certificado";

export const POST = async (request) => {
    const { userId, nome, unidade, foto, mesInicio, mesFim, anoInicio, anoFim } = await request.json()
    try {

        await ConnectToDB()

        if (!userId) {
            return new Response("Usuário não encontrado!", { status: 404 })
        } else {

            // Criar novo Certificado
            try {
                const newCertificado = new Certificado({
                    dono: userId,
                    nome: nome,
                    unidade: unidade,
                    foto: foto,
                    mesInicio: mesInicio,
                    mesFim: mesFim,
                    anoInicio: anoInicio,
                    anoFim: anoFim,
                })

                await newCertificado.save()
                return new Response(JSON.stringify(newCertificado), {status: 200})

            } catch (error) {
                console.log(error)
                return new Response(`Falha ao criar os certificados, ${error}`, {status: 500})
            }

        }

    } catch (error) {
        console.log(error)
        return new Response(`Falha ao fazer o POST dos certificados, ${error}`, {status: 500})
    }
}
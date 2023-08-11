import { ConnectToDB } from "@utils/database";
import Experiencia from "@models/Experiencia";

export const POST = async (request) => {
    const { userId, empresa, cargo, aprendizado, mesInicio, mesFim, anoInicio, anoFim, habilidades, local } = await request.json()
    try {

        await ConnectToDB()

        if (!userId) {
            return new Response("Usuário não encontrado!", { status: 404 })
        } else {

            // Criar novo Certificado
            try {
                const newExperiencia = new Experiencia({
                    dono: userId,
                    empresa: empresa,
                    cargo: cargo,
                    aprendizado: aprendizado,
                    mesInicio: mesInicio,
                    mesFim: mesFim,
                    anoInicio: anoInicio,
                    anoFim: anoFim,
                    local: local,
                    habilidades: habilidades
                })

                await newExperiencia.save()
                return new Response(JSON.stringify(newExperiencia), {status: 200})

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
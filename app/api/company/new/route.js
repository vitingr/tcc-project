import { ConnectToDB } from "@utils/database";
import Pagina from "@models/Pagina";

export const POST = async (request) => {
    const { userId, nome, website, photo, industria, tamanho, tipo } = await request.json()
    try {
        await ConnectToDB()
        if (!userId) {
            return new Response("Usuário não encontrado!", { status: 404 })
        } else {
            try {
                //Transformar em Arquivo válido multer

                if (response.ok) {
                    return new Response(JSON.stringify(), { status: 200 })
                } else {
                    return new Response(`Falha ao criar a empresa, ${error}`, { status: 500 })
                }

            } catch (error) {
                console.log(error)
                return new Response(`Falha ao criar a empresa, ${error}`, { status: 500 })
            }
        }
    } catch (error) {
        console.log(error)
        return new Response(`Falha ao localizar o Usuário, ${error}`, { status: 500 })
    }
}
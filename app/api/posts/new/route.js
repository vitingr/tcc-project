import { ConnectToDB } from "@utils/database";
import Postagem from "@models/Postagem";

export const POST = async (request) => {
    const { userId, fotoDono, nomeDono, foto, conteudo, curtidas, compartilhamentos } = await request.json()
    try {

        await ConnectToDB()

        if (!userId) {
            return new Response("Usuário não encontrado!", { status: 404 })
        } else {
            // Criar nova Postagem
            try {
                const newPost = new Postagem({
                    dono: userId,
                    fotoDono: fotoDono,
                    nomeDono: nomeDono,
                    conteudo: conteudo,
                    fotos: foto,
                    curtidas: curtidas,
                    compartilhamentos: compartilhamentos
                })

                await newPost.save()
                return new Response(JSON.stringify(newPost), { status: 200 })

            } catch (error) {
                console.log(error)
                return new Response(`Falha ao criar o posts, ${error}`, { status: 500 })
            }
        }

    } catch (error) {
        console.log(error)
        return new Response(`Falha ao fazer o POST dos posts, ${error}`, { status: 500 })
    }
}
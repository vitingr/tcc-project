import { ConnectToDB } from "@utils/database";
import Postagem from "@models/Postagem";

export const POST = async (request) => {
    const { userId, fotoDono, nomeDono, foto, conteudo, curtidas, compartilhamentos } = await request.json()

    const meses = [
        "janeiro", "fevereiro", "março", "abril", "maio", "junho",
        "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"
    ];

    try {

        await ConnectToDB()

        if (!userId) {
            return new Response("Usuário não encontrado!", { status: 404 })
        } else {
            // Criar nova Postagem
            try {

                const data = new Date()

                const dia = data.getDate();
                const mes = meses[data.getMonth()];
                const ano = data.getFullYear();
                const hora = data.getHours();
                const minutos = data.getMinutes();

                const dataFormatada = `${dia} de ${mes} de ${ano} às ${hora}:${minutos}`;

                const newPost = await new Postagem({
                    dono: userId,
                    fotoDono: fotoDono,
                    nomeDono: nomeDono,
                    data: dataFormatada,
                    conteudo: conteudo,
                    fotos: foto, 
                    curtidas: curtidas,
                    idsCurtidas: "",
                    compartilhamentos: compartilhamentos
                })

                newPost.save()
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
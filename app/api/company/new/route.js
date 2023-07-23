import { ConnectToDB } from "@utils/database";
import Pagina from "@models/Pagina";

export const POST = async (request) => {
    const { userId, nome, modelo, website, photo, industria, tamanho, tipo } = await request.json()
    try {
        await ConnectToDB()
        if (!userId) {
            return new Response("Usuário não encontrado!", { status: 404 })
        } else {
            try {

                const newCompany = new Pagina({
                    dono: userId,
                    modelo: modelo,
                    nome: nome,
                    website: website,
                    qtdFuncionarios: tamanho,
                    industria: industria,
                    tipo: tipo,
                    logo: "https://cdn-icons-png.flaticon.com/512/5809/5809858.png",
                    background: "/assets/images/bg2.jpg",
                    seguidores: 0
                })

                await newCompany.save()
                return new Response(JSON.stringify(), { status: 200 })

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
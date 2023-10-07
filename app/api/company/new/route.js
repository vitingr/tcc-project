import { ConnectToDB } from "@utils/database";
import Pagina from "@models/Pagina";
import User from "@models/User";

export const POST = async (request) => {
    const { userId, nome, modelo, website, photo, industria, tamanho, tipo, descricao } = await request.json()
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
                    photo: photo,
                    website: website,
                    qtdFuncionarios: tamanho,
                    industria: industria,
                    tipo: tipo,
                    foto: "/assets/images/undefined.svg",
                    background: "/assets/images/bg2.jpg",
                    qtdSeguidores: 0,
                    seguidores: "",
                    endereco: "",
                    descricao: descricao
                })

                const usuario = await User.findOne({_id: userId})

                if (usuario) {
                    
                    usuario.tipoConta = `${modelo}`
                    await newCompany.save()
                    await usuario.save()
                    
                    return new Response(JSON.stringify(), { status: 200 })
                } else {
                    return new Response(`Falha ao localizar o Usuário, ${error}`, { status: 500 })
                }

            } catch (error) {
                return new Response(`Falha ao criar a empresa, ${error}`, { status: 500 })
            }
        }
    } catch (error) {
        return new Response(`Falha ao localizar o Usuário, ${error}`, { status: 500 })
    }
}
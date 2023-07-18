import { ConnectToDB } from "@utils/database";
import User from "@models/User";

export const POST = async (request) => {

    const { userId, nome, sobrenome, telefone, website, cargo_atual, area, ultima_empresa } = await request.json()

    // Verificar Parametros
    if (userId) {
        try {

            await ConnectToDB()

            const user = await User.findOne({ _id: userId })

            if (user) {

                const nomeCompleto = `${nome} ${sobrenome}`

                user.nome = nome
                user.sobrenome = sobrenome
                user.nomeCompleto = nomeCompleto
                user.telefone = telefone
                user.website = website
                user.cargo_atual = cargo_atual
                user.area = area
                user.ultima_empresa = ultima_empresa

                user.save()
                return new Response("Usuário atualizado com sucesso!", { status: 200 })


            } else {
                return new Response(`Não foi possível encontrar o usuário. ${error}`, { status: 500 })
            }
        } catch (error) {
            return new Response(`Falha ao fazer o GET dos posts. ${error}`, { status: 500 })
        }
    } else {
        return new Response(`Não foi possível encontrar o usuário. ${error}`, { status: 500 })
    }
}
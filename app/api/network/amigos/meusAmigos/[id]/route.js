import { ConnectToDB } from "@utils/database";
import User from "@models/User";

export const GET = async (request, { params }) => {
    try {
        await ConnectToDB()
        // Verificar convites enviados
        try {
            let meusAmigos = []
            let amigos = []
            const usuario = await User.findOne({_id: params.id}).lean()
            const amigosUser = usuario.amigos.split(" ")

            amigosUser.forEach(item => {
                if (item == 0 || item == null || item == undefined || item == "" || !item) {
                    console.log("Amigo Invalido")
                } else {
                    amigos.push(item)
                }
            })
            
            const response = await User.find({ _id: { $in: amigos } }).lean()
            response.forEach((opcao) => {
                console.log(`AMIGO AGR = ${opcao.email}`)
                if (opcao.amigos.includes(params.id)) {
                    meusAmigos.push(opcao)
                } else {
                    console.log("Não é amigo")
                }
            })
            if (meusAmigos) {
                return new Response(JSON.stringify(meusAmigos), { status: 200 })
            } else {
                console.log("ERRO ao encontrar os amigos")
            }

        } catch (error) {
            console.log(error)
            return new Response(`Falha ao encontrar os amigos, ${error}`, { status: 500 })
        }


    } catch (error) {
        console.log(error)
        return new Response(`Falha ao fazer o GET dos amigos, ${error}`, { status: 500 })
    }
}
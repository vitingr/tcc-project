import { ConnectToDB } from "@utils/database";
import User from "@models/User";

export const GET = async (request, { params }) => {
    try {
        await ConnectToDB()
        
        try {
            let meusAmigos = []
            let amigos = []
            const user = await User.find({_id: params.id}).lean()
            
            user.forEach(item => {
                if (item == 0 || item == null || item == undefined || item == "" || !item) {
                    return
                } else {
                    amigos.push(item)
                }
            })

            const response = await User.find({ _id: { $in: amigos } }).lean()
            response.forEach((opcao) => {
                if (opcao.amigos.includes(params.id)) {
                    meusAmigos.push(opcao)
                }
            })
            if (meusAmigos) {
                return new Response(JSON.stringify(meusAmigos), { status: 200 })
            } else {
                console.log("ERRO ao encontrar os amigos")
            }

        } catch (error) {
            return new Response(`Falha ao encontrar os amigos, ${error}`, { status: 500 })
        }

    } catch (error) {
        return new Response(`Falha ao fazer o GET dos amigos, ${error}`, { status: 500 })
    }
}
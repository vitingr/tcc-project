import { ConnectToDB } from "@utils/database";
import User from "@models/User";
import Endereco from "@models/Endereco";
import Postagem from "@models/Postagem";

export const POST = async (request) => {

  const { userId, cidade, estado, pais, area, preferenciaEmprego, cargoAtual, ultimoContrato, ultimaEmpresa, procurandoEmprego, share } = await request.json()

  if (userId) {
    try {

      await ConnectToDB() 

      const newEndereco = await new Endereco({
        dono: userId,
        pais: pais,
        estado: estado,
        cidade: cidade
      })

      try {
        const user = await User.findOne({_id: userId})

        if (user) {
          user.area = area
          user.preferencia_emprego = preferenciaEmprego
          user.cargo_atual = cargoAtual
          user.ultimo_contrato = ultimoContrato
          user.ultima_empresa = ultimaEmpresa
          user.procurando_emprego = procurandoEmprego

          if (share === true) {
            
            const newPostagem = await new Postagem({
              dono: userId,
              fotoDono: user.foto,
              nomeDono: user.nomeCompleto,
              conteudo: "😀 Estou muito feliz em compartilhar o meu primeiro post na plataforma! vamos nos conectar e formar novas amizades.",
              fotos: "https://media.licdn.com/dms/image/sync/C4E18AQEA4FSD2o7Amg/companyUpdate-article-image-shrink_627_1200/0/1659679841281?e=1693440000&v=beta&t=JTQrpOQY08aDttmV42sWo3FBj0z1lUPG21UdMdAXzkU",
              curtidas: 0,
              compartilhamentos: 0
            })

            await user.save()
            await newPostagem.save()
            await newEndereco.save()

            return new Response("Perfil finalizado com sucesso", { status: 200 })

          } else {

            await user.save()
            await newEndereco.save()

            return new Response("Perfil finalizado com sucesso", { status: 200 })

          }

        } else {
          return new Response(`Não foi possível encontrar o usuário. ${error}`, { status: 500 })
        }

      } catch (error) {
        console.log(error)
        return new Response(`Não foi possível editar o perfil. ${error}`, { status: 500 })
      }

    } catch (error) {
      console.log(error)
    return new Response(`Não foi possível criar o endereço. ${error}`, { status: 500 })
    }

  } else {
    return new Response(`Não foi possível encontrar o usuário. ${error}`, { status: 500 })
  }
}
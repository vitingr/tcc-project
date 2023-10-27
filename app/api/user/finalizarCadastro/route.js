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
        const user = await User.findOne({ _id: userId })

        if (user) {
          user.area = area
          user.preferencia_emprego = preferenciaEmprego
          user.cargo_atual = cargoAtual
          user.ultimo_contrato = ultimoContrato
          user.ultima_empresa = ultimaEmpresa
          user.procurando_emprego = procurandoEmprego

          if (share === true) {

            const meses = [
              "janeiro", "fevereiro", "março", "abril", "maio", "junho",
              "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"
          ];

            const data = new Date()

            const dia = data.getDate();
            const mes = meses[data.getMonth()];
            const ano = data.getFullYear();
            const hora = data.getHours();
            const minutos = data.getMinutes();

            const dataFormatada = `${dia} de ${mes} de ${ano} às ${hora}:${minutos}`;

            const newPostagem = await new Postagem({
              dono: userId,
              fotoDono: user.foto,
              nomeDono: user.nomeCompleto,
              data: dataFormatada,
              conteudo: "😀 Estou muito feliz em compartilhar o meu primeiro post na plataforma! vamos nos conectar e formar novas amizades.",
              fotos: "https://thumbs.dreamstime.com/b/connection-abstract-metaphor-people-connecting-plug-socket-together-connection-abstract-metaphor-people-connecting-plug-171652638.jpg",
              curtidas: 0,
              idsCurtidas: "",
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
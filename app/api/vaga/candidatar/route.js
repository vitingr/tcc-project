import { ConnectToDB } from "@utils/database";
import Candidatura from "@models/Candidatura";

export const POST = async (request) => {
  const { userId, pageId, vagaId, foto, fotoCandidato, nome, titulo, cargo, descricao } = await request.json()

  const meses = [
    "janeiro", "fevereiro", "março", "abril", "maio", "junho",
    "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"
  ]

  if (userId) {
    try {
      
      await ConnectToDB()

      const candidatura = await Candidatura.findOne({ $and: [{ dono: userId }, { vaga: vagaId }] }).lean()

      if (!candidatura && candidatura === null) {

        const data = new Date()

        const dia = data.getDate();
        const mes = meses[data.getMonth()];
        const ano = data.getFullYear();
        const hora = data.getHours();
        const minutos = data.getMinutes();

        const dataFormatada = `${dia} de ${mes} de ${ano} às ${hora}:${minutos}`;

        try {
          const newCandidatura = new Candidatura({
            dono: userId,
            pagina: pageId,
            vaga: vagaId,
            paginaFoto: foto,
            candidatoFoto: fotoCandidato,
            nome: nome,
            titulo: titulo,
            cargo: cargo,
            descricao: descricao,
            data: dataFormatada
          })
  
          await newCandidatura.save()
          return new Response(JSON.stringify(newCandidatura), { status: 200 })

        } catch (error) {
          console.log(error)
          return new Response(`ERRO! Não foi possível concluir a candidatura, ${error}`, { status: 500 })
        }
        
      } else {
        return new Response(`ERRO! Você já se candidatou a essa ${vaga}`, { status: 500 })
      }

    } catch (error) {
      console.log(error)
      return new Response(`ERRO! Não foi possível concluir a candidatura, ${error}`, { status: 500 })
    }
  }
}
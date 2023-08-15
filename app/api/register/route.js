import { ConnectToDB } from "@utils/database";
import User from "@models/User";

export const POST = async (request) => {
  const { data } = await request.json()
  try {

    await ConnectToDB()

    try {

      const sessionUser = await User.findOne({ email: data.email })

      if (!sessionUser) {
        const nomeCompleto = `${data.name} ${data.lastname}`

        await User.create({
          logado: true,
          tipoConta: "usuario",
          nome: data.name,
          sobrenome: data.lastname,
          nomeCompleto: nomeCompleto,
          email: data.email,
          senha: data.password,
          ultimo_cargo: "",
          ultima_empresa: "",
          ultimo_contrato: "",
          area: "",
          preferencia_emprego: "",
          procurando_emprego: "",
          escola: "",
          amigos: "",
          amigos_pendentes: "",
          notificacoes: 0,
          paginas: "",
          foto: "https://static.licdn.com/sc/h/1c5u578iilxfi4m4dvc4q810q",
          background: "/assets/images/bg1.jpg",
          seguidores: 0,
          resumo: "",
          cargo_atual: "",
          telefone: "",
          website: "",
          novoUsuario: true
        })
      }

      return new Response("Usuario cadastrado com sucesso!", { status: 200 })

    } catch (error) {
      console.log(error)
      return new Response(`Falha ao criar os certificados, ${error}`, { status: 500 })
    }

  } catch (error) {
    console.log(error)
    return new Response(`Falha ao fazer o POST dos certificados, ${error}`, { status: 500 })
  }
}
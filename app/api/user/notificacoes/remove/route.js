import User from "@models/User"

export const POST = async (request) => {

  const { userId } = await request.json()

  if (userId) {
    try {

      const user = await User.findOne({ _id: userId })
      user.notificacoes = 0
      user.save()

      return new Response(`Notificações removidas com sucesso`, { status: 200 })

    } catch (error) {
      return new Response(`ERRO! Não foi possível remover as notificações`, { status: 500 })
    }
  }
}
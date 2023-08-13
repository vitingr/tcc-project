import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

import { ConnectToDB } from '@utils/database'
import User from '@models/User'

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
    ],
    callbacks: {
        async session({ session }) {
            const sessionUser = await User.findOne({
                email: session.user.email
            })

            session.user.id = sessionUser._id.toString()
            return session
        },

        async signIn({ profile }) {
            try {

                await ConnectToDB()

                const userExists = await User.findOne({
                    email: profile.email
                })

				if (!userExists) {
					const separatedNames = profile.name.split(" ")

					await User.create({
						logado: true,
						tipoConta: "usuario",
						nome: separatedNames[0],
						sobrenome: separatedNames[1],
						nomeCompleto: profile.name,
						email: profile.email,
						senha: 123456789,
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
						foto: profile.picture,
						background: "/assets/images/bg1.jpg",
						seguidores: 0,
						resumo: "",
						cargo_atual: "",
						telefone: "",
						website: "",
						novoUsuario: true
					})

				} else {

					console.log("Usuário Existente")
				}

				return true

			} catch (error) {

				console.log(`ERRO: ${error}`);
				return false

			}
		},
	}
})

export { handler as GET, handler as POST }

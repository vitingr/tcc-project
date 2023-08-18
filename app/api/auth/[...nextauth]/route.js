import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from "next-auth/providers/credentials"

import { ConnectToDB } from '@utils/database'
import User from '@models/User'
import { signIn } from 'next-auth/react'

const handler = NextAuth({
	session: {
		strategy: "jwt"
	},
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		}),
		CredentialsProvider({
			name: "credentials",
			credentials: {
				email: { label: "Email", type: "email", placeholder: "Seu email" },
				password: { label: "Password", type: "password" }
			},
			async authorize(credentials, req) {

				const { email, password } = credentials

				if (!email || !password) {
					throw new Error(`Credenciais Inválidas`)
				} 

				try {
					await ConnectToDB()

					const userExists = await User.findOne({
						email: email
					})
	
					if (!userExists) {
						console.log("Usuario não Encontrado")
					} else {
						console.log("Usuário Existente")

						const user = { id: userExists._id, name: userExists.nomeCompleto, email: userExists.email }

						if (user) {
							return user
						} else {
							return null
						}
					}

				} catch (error) {
					return false

				}
			}
		})
	],
	pages: {
		signIn: "/",
	},
	callbacks: {
		async session({ session }) {
			const sessionUser = await User.findOne({
				email: session.user.email
			})

			session.user.id = sessionUser._id.toString()
			return session
		},
		async signIn({ profile, credentials }) {
			try {

				await ConnectToDB()

				if (credentials) {
					return true
				}

				if (profile) {
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
							novoUsuario: true,
							profile_views: 0,
							profile_searchs: 0,
							headline: "",
							premium: 0
						})
	
					} else {
	
						console.log("Usuário Existente")
					}
	
					return true
				}

			} catch (error) {
				
				return false

			}
		},
	}
})

export { handler as GET, handler as POST }

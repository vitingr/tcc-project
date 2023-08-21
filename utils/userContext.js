"use client"

import { useSession } from 'next-auth/react'
import React, { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {

	const { data: session, status } = useSession()
	const [tema, setTema] = useState("")
	const [data, setData] = useState([])
	const [premiumInfo, setPremiumInfo] = useState([])

	const getInfo = async () => {
		try {
			const answer = await fetch(`/api/user/${session?.user.id}`)
			const response = await answer.json()
			setData(response)

			// Definir o tema
			if (response.tema === "light") {
				setTema("light")
			}
			if (response.tema === "dark") {
				setTema("dark")
			}

			if (data.premium === 1) {
				const result = await fetch(`/api/premium/${session?.user.id}`)
				const isPremium = await result.json()
				setPremiumInfo(isPremium)
			}

		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		const isUserAuthenticated = () => {

			if (status == 'loading') {
				// A sessão ainda está sendo carregada, não faz nada neste momento.
			} else {
				if (status == "authenticated") {
					if (session != undefined || session != null) {
						getInfo()
					}
				}
			}
		}
		isUserAuthenticated()
	}, [session])

	return (
		<ThemeContext.Provider value={{ tema, setTema, data, setData, premiumInfo, setPremiumInfo, getInfo }}>
			{children}
		</ThemeContext.Provider>
	)
}

export const infoUser = () => useContext(ThemeContext)
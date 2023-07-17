"use client"

import { useSession } from 'next-auth/react'
import React, { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {

	const { data: session } = useSession()
	const [tema, setTema] = useState("")
	const [data, setData] = useState([])

	const getTheme = async () => {
		try {
			const answer = await fetch(`/api/user/${session?.user.id}`)
			const response = await answer.json()
			setData(response)
			console.log(response)

			if (response.tema === "light") {
				setTema("light")
			}
			if (response.tema === "dark") {
				setTema("dark")
			}
			console.log(`TEMA ${tema}`)
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		if (session != undefined || session != null) {
			getTheme()
		}
	}, [session])

	return (
		<ThemeContext.Provider value={{ tema, setTema }}>
			{children}
		</ThemeContext.Provider>
	)
}

export const userTheme = () => useContext(ThemeContext)
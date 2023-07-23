"use client"

import { useSession } from 'next-auth/react'
import React, { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {

	const { data: session } = useSession()
	const [tema, setTema] = useState("")
	const [data, setData] = useState([])
	const [companyInfo, setCompanyInfo] = useState([])

	const getCompany = async () => {
		try {
			const company = await fetch(`/api/company/${session?.user.id}`)
			const companyInfo = await company.json()

			console.log(companyInfo)

			if (companyInfo.ok) {
				setCompanyInfo(companyInfo)
			} else {
				console.log("Usuário não possui empresa")
			}

		} catch (error) {
			console.error(error)
		}
	}

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
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		if (session != undefined || session != null) {
			getInfo()
			getCompany()
		}
	}, [session])

	return (
		<ThemeContext.Provider value={{ tema, setTema, data, setData, companyInfo, setCompanyInfo, getInfo, getCompany }}>
			{children}
		</ThemeContext.Provider>
	)
}

export const infoUser = () => useContext(ThemeContext)
"use client"

import React, { useState } from 'react'
import CreateCompanyForm from '@components/CreateCompanyForm'
import { infoUser } from '@utils/userContext'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'

// Imports Components
import ToastMessage from '@components/ToastMessage'

const page = () => {

	const router = useRouter()
	const { data } = infoUser()

	const [nome, setNome] = useState("")
	const [website, setWebsite] = useState("")
	const [industria, setIndustria] = useState("")
	const [tamanho, setTamanho] = useState("")
	const [tipo, setTipo] = useState("")
	const [descricao, setDescricao] = useState("")
	const [confirm, setConfirm] = useState("")
	const [photo, setPhoto] = useState(null)

	// POST

	const createCompany = async (e) => {
		e.preventDefault()

		if (nome.length < 2) {
			toast.error("O nome da empresa está muito curto")
		}
		if (nome.length > 60) {
			toast.error("O nome da empresa está muito longo")
		}
		if (website.length < 6) {
			toast.error("O nome do website está muito curto")
		}
		if (website.length > 75) {
			toast.error("O nome do website está muito longo")
		}
		if (industria.length < 2) {
			toast.error("O nome do ramo industrial está muito curto")
		}
		if (industria.length > 40) {
			toast.error("O nome do ramo industrial está muito longo")
		}

		try {
			const response = await fetch("/api/company/new", {
				method: "POST",
				body: JSON.stringify({
					userId: data._id,
					modelo: "empresa",
					nome: nome,
					photo: photo,
					website: website,
					industria: industria,
					tamanho: tamanho,
					tipo: tipo,
					descricao: descricao
				})
			})

			if (response.ok) {
				router.push("/usuario/feed")
				toast.success("Empresa Criada com Sucesso")

			} else {
				console.log(response)
				toast.error("Houve um erro ao criar a Empresa")
			}
		} catch (error) {
			console.log(error)
			toast.error("Houve um erro ao criar a Empresa")
		}

	}

	return (
		<div className='create-instituition'>
			<ToastMessage />
			<CreateCompanyForm title={"Instituição"} nome={setNome} website={setWebsite} industria={setIndustria} tamanho={setTamanho} tipo={setTipo} descricao={setDescricao} photo={setPhoto} confirm={setConfirm} handleClick={createCompany} />
		</div>
	)
}

export default page
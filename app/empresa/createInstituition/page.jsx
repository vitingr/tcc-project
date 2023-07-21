"use client"

import React, { useState } from 'react'
import CreateCompanyForm from '@components/CreateCompanyForm'
import { infoUser } from '@utils/userContext'

const page = () => {

	const {data} = infoUser()

	const [nome, setNome] = useState("")
	const [website, setWebsite] = useState("")
	const [industria, setIndustria] = useState("")
	const [tamanho, setTamanho] = useState("")
	const [tipo, setTipo] = useState("")
	const [descricao, setDescricao] = useState("")
	const [confirm, setConfirm] = useState("")

	// POST

	const createCompany = async (e) => {
		e.preventDefault()
		console.log(`${nome}, ${website}, ${industria}, ${tamanho}, ${tipo}, ${confirm}`)
	}

	return (
		<div className='create-instituition'>
			<CreateCompanyForm title={"Instituição"} nome={setNome} website={setWebsite} industria={setIndustria} tamanho={setTamanho} tipo={setTipo} descricao={setDescricao} confirm={setConfirm} handleClick={createCompany} />
		</div>
	)
}

export default page
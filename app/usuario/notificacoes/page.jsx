"use client"

import { infoUser } from '@utils/userContext'
import React, { useEffect, useState } from 'react'
import { IoEllipsisHorizontalSharp } from 'react-icons/io5'

const page = () => {

	const { data, getInfo } = infoUser()
	const [notificacoes, setNotificacoes] = useState([])

	const findNotificacoes = async () => {
		const query = await fetch(`/api/user/notificacoes/${data._id}`)
		const response = await query.json()
		setNotificacoes(response)
		console.log(response)
	}

	useEffect(() => {
		if (data) {
			findNotificacoes()
		}
	}, [data])

	return (
		<div className='notificacoes-container'>
			{notificacoes.map((notificacao) => (
				<div className='notificacao icon-cursor'>
					<div className='notificacao-image'>
						<img src={notificacao.foto} alt="photo-notificacao" className='small-rounded-photo' />
					</div>
					<div className='notificacao-content'>
						<p>{notificacao.texto}</p>
						<div className='notificacao-actions'>
							<IoEllipsisHorizontalSharp size={20} />
						</div>
					</div>
				</div>
			))}
		</div>
	)
}

export default page
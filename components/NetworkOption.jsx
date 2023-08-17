"use client"

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { toast } from 'react-toastify'
import Link from 'next/link'

// Imports Components
import ToastMessage from '@components/Others/ToastMessage'

const NetworkOption = ({ content, handleClick, message, type }) => {

	const { data: session } = useSession()
	const [data, setData] = useState([])

	// 		<Link href={type === "usuario" ? `/usuario/user/${content._id}` : "/usuario/feed"}>

	return (
		<div>
			<ToastMessage />
			<div className='friend-option'>
				<div className='friend-bg' style={{ backgroundImage: `url(${content.background})` }}></div>
				<div className='friend-info'>
					<div className='friend-photo-container'><img src={content.foto} className='medium-rounded-photo' alt='profile photo' /></div>
					<div className='friend-main-info'>
						{type === "usuario" ? (
							<h4>{content.nomeCompleto}</h4>
						) : (
							<h4>{content.nome}</h4>
						)}
						<p>{content.resumo} Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor non sit exercitationem laboriosam, voluptatum nisi repudiandae odio rem commodi. Soluta labore distinctio, similique perferendis repudiandae dignissimos eius harum voluptatibus aspernatur.</p>
					</div>
				</div>
				<div className='add-friend-actions icon-cursor'>
					{type === "usuario" ? (
						<p>{content.seguidores} seguidores</p>
					) : (
						<p>{content.qtdSeguidores} seguidores</p>
					)}
					<div className='add-friend-button icon-cursor' onClick={() => handleClick(content._id)}>
						{message}
					</div>
				</div>
			</div>
		</div>
	)
}

export default NetworkOption
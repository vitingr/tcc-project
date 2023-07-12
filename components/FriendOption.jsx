"use client"

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { toast } from 'react-toastify'

// Imports Components
import ToastMessage from '@components/ToastMessage'

const FriendOption = ({ amigo, handleClick, message }) => {

	const {data: session} = useSession()
	const [data, setData] = useState([])

	return (
		<div>
			<ToastMessage />
			<div className='friend-option'>
				<div className='friend-bg' style={{ backgroundImage: `url(${amigo.background})` }}></div>
				<div className='friend-info'>
					<div className='friend-photo-container'><Image src={amigo.foto} width={100} height={100} className='medium-rounded-photo' alt='profile photo' /></div>
					<div className='friend-main-info'>
						<h4>{amigo.nomeCompleto}</h4>
						<p>{amigo.resumo} Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor non sit exercitationem laboriosam, voluptatum nisi repudiandae odio rem commodi. Soluta labore distinctio, similique perferendis repudiandae dignissimos eius harum voluptatibus aspernatur.</p>
					</div>
				</div>
				<div className='add-friend-actions icon-cursor'>
					<p>{amigo.seguidores} seguidores</p>
					<div className='add-friend-button icon-cursor' onClick={() => handleClick(amigo._id)}>
						{message}
					</div>
				</div>
			</div>
		</div>
	)
}

export default FriendOption
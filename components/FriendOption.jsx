"use client"

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { toast } from 'react-toastify'

// Imports Components
import ToastMessage from '@components/ToastMessage'

const FriendOption = ({ content, handleClick, message }) => {

	const {data: session} = useSession()
	const [data, setData] = useState([])

	return (
		<div>
			<ToastMessage />
			<div className='friend-option'>
				<div className='friend-bg' style={{ backgroundImage: `url(${content.background})` }}></div>
				<div className='friend-info'>
					<div className='friend-photo-container'><img src={content.foto} className='medium-rounded-photo' alt='profile photo' /></div>
					<div className='friend-main-info'>
						<h4>{content.nomeCompleto}</h4>
						<p>{content.resumo} Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor non sit exercitationem laboriosam, voluptatum nisi repudiandae odio rem commodi. Soluta labore distinctio, similique perferendis repudiandae dignissimos eius harum voluptatibus aspernatur.</p>
					</div>
				</div>
				<div className='add-friend-actions icon-cursor'>
					<p>{content.seguidores} {content.qtdSeguidores} seguidores</p>
					<div className='add-friend-button icon-cursor' onClick={() => handleClick(content._id)}>
						{message}
					</div>
				</div>
			</div>
		</div>
	)
}

export default FriendOption
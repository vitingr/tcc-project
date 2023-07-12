import React from 'react'
import Image from 'next/image'
import { IoHeartOutline, IoChatbubblesOutline, IoSendOutline, IoShareSocialOutline } from 'react-icons/io5'

const Post = ({ post }) => {
	return (
		<div className='post-container'>
			<div className='top-post-container'>
				<div className='post-photo'>
					<Image src={post.fotoDono} width={100} height={100} className='very-small-rounded-photo' alt="photo" />
				</div>
				<div className='post-creator-info'>
					<h3>{post.nomeDono}</h3>
					<p>{post.data}</p>
				</div>
			</div>
			<div className='content-post'>
				{post.conteudo}
			</div>
			<div className='post-actions'>
				<div className='post-icons'>
					<div className='post-icon icon-cursor'><IoHeartOutline size={18} /></div>
					<div className='post-icon icon-cursor'><IoChatbubblesOutline size={18} /></div>
					<div className='post-icon icon-cursor'><IoSendOutline size={18} /></div>
					<div className='post-icon icon-cursor'><IoShareSocialOutline size={18} /></div>
				</div>
				<div>
					<p className='post-likes icon-cursor'>
						{post.curtidas} curtidas
					</p>
				</div>
			</div>
		</div>
	)
}

export default Post
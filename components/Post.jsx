"use client"

import React from 'react'
import Image from 'next/image'
import { IoHeartOutline, IoChatbubblesOutline, IoSendOutline, IoShareSocialOutline, IoHeart } from 'react-icons/io5'
import { infoUser } from '@utils/userContext'
import { toast } from 'react-toastify'

const Post = ({ post, fetchData }) => {

	const { data } = infoUser()

	const likePost = async (postId) => {
		if (postId) {
			try {
				const response = await fetch("/api/posts/like", {
					method: "POST",
					body: JSON.stringify({
						postId: postId,
						userId: data._id
					})
				})

				if (response.ok) {
					fetchData()
				} else {
					toast.error("ERRO! Não foi possível curtir a postagem")
				}

			} catch (error) {
				console.log(error)
				toast.error("ERRO! Não foi possível interagir com a postagem")
			}
		}
	}

	return (
		<div className='post-container'>
			<div className='top-post-container'>
				<div className='post-photo'>
					<img src={post.fotoDono} className='very-small-rounded-photo' alt="photo" />
				</div>
				<div className='post-creator-info'>
					<h3>{post.nomeDono}</h3>
					<p>{post.data}</p>
				</div>
			</div>
			<div className='content-post'>
				{post.conteudo}
			</div>
			{post.fotos ? (
				<div className='image-post'>
					<img src={post.fotos} className='image-post-photo' alt="photo-post" />
				</div>
			) : (
				<></>
			)}
			<div className='post-actions'>
				<div className='post-icons'>
					{post.idsCurtidas ? (
						<div className='post-icon icon-cursor' onClick={() => likePost(post._id)}><IoHeart size={18} className="pink-icon" /></div>
					) : (
						<div className='post-icon icon-cursor' onClick={() => likePost(post._id)}><IoHeartOutline size={18} /></div>
					)}
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
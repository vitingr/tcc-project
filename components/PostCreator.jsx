"use client"

import React, { useState } from 'react'
import { IoHappyOutline, IoLocationOutline } from 'react-icons/io5'
import UploadPostPhoto from './Others/UploadPostPhoto'
import { toast } from 'react-toastify'
import ToastMessage from './Others/ToastMessage'
import { useSession } from 'next-auth/react'
import { infoUser } from '@utils/userContext'

const PostCreator = ({ fetchData }) => {

  const { data: session } = useSession()
  const { data } = infoUser()

  const [post, setPost] = useState("")
  const [photo, setPhoto] = useState("")

  const createPost = async () => {
    try {
      const response = await fetch(`/api/posts/new`, {
        method: "POST",
        body: JSON.stringify({
          userId: session?.user?.id,
          fotoDono: data.foto,
          nomeDono: data.nomeCompleto,
          foto: photo,
          conteudo: post,
          curtidas: 0,
          compartilhamentos: 0
        })
      })

      if (response.ok) {
        setPhoto("")
        setPost("")
        fetchData()
        toast.success("Post Criado com sucesso!")
      } else {
        toast.error("Houve um erro ao publicar o Post")
      }

    } catch (error) {
      console.log(error)
      toast.error("Não foi possível publicar o Post")
    }
  }

  return (
    <>
      <ToastMessage />
      <div className='write-posts-container'>
        <img src={data.foto} className='very-small-rounded-photo post-photo-profile' alt='photo-post' />
        <input type="text" name="post-something" id="post-something" placeholder='Faça uma postagem' className='post-something' spellCheck="false" autoComplete='off' onChange={(e) => setPost(e.target.value)} value={post} />
      </div>

      {photo !== "" ? (
        <div className='image-post margin-top'>
          <img src={photo} alt="Visualization Post Photo" className='image-post-photo' />
        </div>
      ) : (
        <></>
      )}
      <div className='main-posts-container'>
        <div className='actions-posts-container'>
          <UploadPostPhoto file={setPhoto} value={photo} />
          <span><IoLocationOutline size={18} /></span>
          <span><IoHappyOutline size={18} /></span>
        </div>
        <div>
        </div>
        <div className='post-publication icon-cursor center' onClick={async () => {
          await createPost()
        }}>
          Publicar
        </div>
      </div>
    </>
  )
}

export default PostCreator
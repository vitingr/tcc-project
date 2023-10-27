"use client"

import React from 'react'
import { IoHappyOutline, IoLocationOutline } from 'react-icons/io5'
import UploadPostPhoto from './Others/UploadPostPhoto'
import { toast } from 'react-toastify'
import ToastMessage from './Others/ToastMessage'
import { useSession } from 'next-auth/react'
import { infoUser } from '@utils/userContext'

const PostCreator = ({ setPost, fetchData, setPhoto, photo, post }) => {

  const {data: session} = useSession()
  const {data} = infoUser()

  const createPost = async () => {
    try {
      const response = await fetch("/api/posts/new", {
        method: "POST",
        headers: {
          "Cache-Control": "no-cache"
        },
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

      console.log(response)
 
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
      <div className='main-posts-container'>
        <div className='actions-posts-container'>
          <UploadPostPhoto file={setPhoto} value={photo} />
          <span><IoLocationOutline size={18} /></span>
          <span><IoHappyOutline size={18} /></span>
        </div>
        <div>
        </div>
        <div className='post-publication icon-cursor center' onClick={() => {
          createPost()
        }}>
          Publicar
        </div>
      </div>
    </>
  )
}

export default PostCreator
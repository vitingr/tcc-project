"use client"

// Imports React
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { toast } from 'react-toastify'

// Import Components
import Posts from './Posts'
import ToastMessage from '@components/ToastMessage'

// Imports NextAuth
import { useSession } from "next-auth/react"

// Import Icons
import { IoPencilOutline, IoPeopleSharp, IoBusinessOutline, IoPodiumSharp, IoThumbsUpSharp, IoImageOutline, IoLocationOutline, IoHappyOutline } from 'react-icons/io5'

const Feed = ({ data }) => {

  const { data: session } = useSession()
  const [post, setPost] = useState("")
  const [postagens, setPostagens] = useState([])

  const fetchData = async () => {
    const answer = await fetch(`/api/posts/${session?.user.id}`)
    const data = await answer.json()
    setPostagens(data)
  }

  const createPost = async () => {
    try {

      const response = await fetch("/api/posts/new", {
        method: "POST",
        body: JSON.stringify({
          userId: session?.user.id,
          foto: data.foto,
          nomeDono: data.nomeCompleto,
          conteudo: post,
          curtidas: 0,
          compartilhamentos: 0
        })
      })

      if (response.ok) {
        fetchData()
        setPost("")
        toast.success("Post Criado com sucesso!")
      } else {
        toast.error("Houve um erro ao publicar o Post")
      }

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (session) {
      fetchData()
    }
  }, [session])

  return (
    <div className='feed-container'>
      <ToastMessage />
      <div className='actions-container'>
        <div className='home-profile'>
          <div className='background-home-profile'>
          </div>
          <div className='photo-home-profile center'>
            <Image src={session?.user.image} width={100} height={100} className='medium-rounded-photo' alt='photo-left' />
          </div>
          <div className='info-home-profile'>
            <div className='home-basic-info'>
              <Link href="/usuario/profile">
                <h2>{data.nomeCompleto}</h2>
              </Link>
              <p>{data.email}</p>
            </div>
            <div className='home-friends'>
              <div>
                <Link href="/usuario/amigos">
                  <h4>Amizades</h4>
                  <p>Adicione amigos</p>
                </Link>
              </div>
              <div className='center'>
                <span>{data.seguidores}</span>
              </div>
            </div>
            <div className='home-options'>
              <Link href="/usuario/amigos">
                <li className='icon-cursor'>
                  <div className='center'><IoPeopleSharp size={15} /></div>
                  <div>Ver amizades</div>
                </li>
              </Link>
              <Link href="/empresa">
                <li className='icon-cursor'>
                  <div className='center'><IoBusinessOutline size={15} /></div>
                  <div>Conta Empresarial</div>
                </li>
              </Link>
              <li className='icon-cursor'>
                <div className='center'><IoPencilOutline size={15} /></div>
                <div>Editar perfil</div>
              </li>
              <li className='icon-cursor'>
                <div className='center'><IoThumbsUpSharp size={15} /></div>
                <div>Minhas curtidas</div>
              </li>
              <li className='icon-cursor'>
                <div className='center'><IoPodiumSharp size={15} /></div>
                <div className='center'>Atividade perfil</div>
              </li>
            </div>
          </div>
        </div>

      </div>

      <div className='posts-container'>

        <div className='top-posts-container'>
          <div className='write-posts-container'>
            <Image src={session?.user.image} width={100} height={100} className='very-small-rounded-photo' alt='photo-post' />
            <input type="text" name="post-something" id="post-something" className='post-something' onChange={(e) => setPost(e.target.value)} />
          </div>

          <div className='main-posts-container'>
            <div className='actions-posts-container'>
              <span>
                <IoImageOutline size={18} />
              </span>
              <span>
                <IoLocationOutline size={18} />
              </span>
              <span>
                <IoHappyOutline size={18} />
              </span>
            </div>
            <div className='post-publication icon-cursor' onClick={createPost}>
              Publicar
            </div>
          </div>
        </div>

        <Posts posts={postagens} />

      </div>
    </div>
  )
}

export default Feed